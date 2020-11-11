<template>
  <div>
    <modal name="enter-room-modal-content" class="enter-room" :width="'300px'" :height="'150px'">
      <p>{{getUserName}}さんの部屋に入室します。よろしいですか。</p>
      <br />
      <button class="btn btn-dark" @click="enterRoomConfirm">入室</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="enterRoomCancel">キャンセル</button>
      <br />
    </modal>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";

export default {
  mixins: [apiMixin, commonMixin],
  props: ["enterRoom", "collectionName", "category"],
  computed: {
    ...mapState("userStore", ["userInfo"]),
    getUserName() {
      if (this.enterRoom) {
        return this.enterRoom.user_name;
      } else {
        return "";
      }
    },
  },

  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    enterRoomConfirm() {
      // 入室ボタンを非表示にするため先にdummyのオブジェクトをstoreに登録
      this.updateRoomInfo({
        roomInfo: { dummy: "dummy" },
      });
      const db = firebase.firestore();
      // firestoreの最新情報の取得
      const docRef = db.collection(this.collectionName).doc(this.enterRoom.id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data.counterUserId) {
              this.errorDisplay();
            } else {
              // 事前にstoreを更新しておく。（問題なければすぐに入室状態になるはず）
              this.updateRoomInfo({
                roomInfo: {
                  status: "reserve",
                  category: this.category,
                  docId: this.enterRoom.id,
                },
              });
              // firestoreを更新
              const db2 = firebase.firestore();
              // firestoreの最新情報の取得
              const roomDoc = db2
                .collection(this.collectionName)
                .doc(this.enterRoom.id);
              roomDoc
                .update({
                  ...this.enterRoom,
                  counterUserId: this.userInfo.user_id,
                })
                .then((ref) => {
                  // メッセージ表示
                  this.updateFlashMessageDisp({
                    flashMessageDisp: {
                      title: "入室準備",
                      message:
                        "部屋の準備ができたらお知らせします。少々お待ちください。退出する場合はヘッダーのチャットアイコンをクリックしてください。",
                      result: "success",
                      watchFlg: true,
                    },
                  });
                  this.$modal.hide("enter-room-modal-content");
                })
                .catch((error) => {
                  // エラーのときはメッセージ表示
                  this.errorDisplay();
                });
            }
          } else {
            // エラーのときはメッセージ表示
            this.errorDisplay();
          }
        })
        .catch((error) => {
          this.errorDisplay();
        });
    },
    enterRoomCancel() {
      this.$modal.hide("enter-room-modal-content");
    },
    errorDisplay() {
      // メッセージ表示
      this.updateFlashMessageDisp({
        flashMessageDisp: {
          title: "エラー",
          message:
            "入室済もしくは削除済の部屋です。別の部屋を選択してください。",
          result: "error",
          watchFlg: true,
        },
      });
      this.updateRoomInfo(undefined);
      this.$modal.hide("enter-room-modal-content");
    },
  },
};
</script>

<style>
.enter-room {
  text-align: center;
}
</style>
