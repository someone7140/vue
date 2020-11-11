<template>
  <div>
    <modal name="add-room-modal-content" class="add-room" :width="'300px'" :height="'300px'">
      <p>お話ししたい内容を入力の上「作成」ボタンを押してください。</p>
      <br />
      <div class="form-group">
        <label for="contents">お話ししたい内容</label>
        <input type="text" v-model="talkContents" />
      </div>
      <br />
      <button class="btn btn-dark" @click="addRoomConfirm" :disabled="!talkContents">作成</button>&nbsp;&nbsp;&nbsp;
      <button class="btn btn-dark" @click="addRoomCancel">キャンセル</button>
    </modal>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import chatMixin from "~/mixins/chatMixin.js";
import commonMixin from "~/mixins/commonMixin.js";

export default {
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mixins: [apiMixin, chatMixin, commonMixin],
  props: ["collectionName", "category"],
  data() {
    return {
      talkContents: undefined,
      roomDocId: undefined,
      roomId: undefined,
    };
  },
  created() {
    // 部屋作成モーダルを非表示
    this.$modal.hide("add-room-modal-content");
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    async addRoomConfirm() {
      // 入室ボタンを非表示にするため先にdummyのオブジェクトをstoreに登録
      this.updateRoomInfo({
        roomInfo: { dummy: "dummy" },
      });
      // firebaseに追加
      const db = firebase.firestore();
      // コレクションの設定
      const roomCollection = db.collection(this.collectionName);
      roomCollection
        .add({
          user_id: this.userInfo.user_id,
          user_name: this.userInfo.name,
          image_url: this.userInfo.image_url,
          description: this.talkContents,
          created_at: new Date(),
        })
        .then((ref) => {
          this.roomDocId = ref.id;
          // 部屋番号を生成
          this.roomId = this.generateRamdomToken(16);
          // 新しくチャットの部屋を作成
          const db2 = firebase.firestore();
          // コレクションの設定
          const chatCollection = db2.collection("personal_chat_" + this.roomId);
          chatCollection
            .add({
              user_list: [this.userInfo.user_id],
              setting_info: true,
              created_at: new Date(),
            })
            .then((ref2) => {
              // storeに登録
              this.updateRoomInfo({
                roomInfo: {
                  status: "wait",
                  roomId: this.roomId,
                  category: this.category,
                  docId: this.roomDocId,
                  chatSettingInfoDocId: ref2.id,
                },
              });
              this.updateFlashMessageDisp({
                flashMessageDisp: {
                  title: "部屋作成",
                  message:
                    "部屋を作成しました、お相手が入室したらお知らせします。部屋を破棄する場合はヘッダーのチャットアイコンをクリックし「退出」ボタンを押してください。",
                  result: "success",
                  watchFlg: true,
                },
              });
            })
            .catch((error) => {
              this.updateFlashMessageDisp({
                flashMessageDisp: {
                  title: "エラー",
                  message:
                    "エラーが発生しました。恐れ入りますが部屋を再作成してください。",
                  result: "error",
                  watchFlg: true,
                },
              });
              // 部屋情報の削除
              this.postApi(this.$axios, "chat/delete_personal_chat_room", {
                delete_personal_chat_room_param: {
                  category: this.category,
                  room_doc_id: this.roomInfo.docId,
                },
              });
              this.updateRoomInfo(undefined);
              this.$router.push({ path: "/top" });
            });
        })
        .catch((error) => {
          // エラーのときはメッセージ表示
          this.updateFlashMessageDisp({
            flashMessageDisp: {
              title: "エラー",
              message:
                "登録処理中にエラーが発生しました。再度登録してエラーが発生する場合はお問い合わせください。",
              result: "error",
              watchFlg: true,
            },
          });
          this.updateRoomInfo(undefined);
        });

      // 部屋作成モーダルを非表示
      this.$modal.hide("add-room-modal-content");
      // 話したい内容を初期化
      this.talkContents = undefined;
    },
    addRoomCancel() {
      // 部屋作成モーダルを非表示
      this.$modal.hide("add-room-modal-content");
    },
  },
};
</script>

<style>
.add-room {
  text-align: center;
}
</style>