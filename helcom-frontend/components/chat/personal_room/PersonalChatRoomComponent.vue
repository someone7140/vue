<template>
  <div>
    <div>一対一チャット待機部屋（{{categoryName}}）</div>
    <br />
    <div v-if="!roomInfo">
      <button class="btn btn-dark" @click="addRoom">新規に部屋を作成</button>
    </div>
    <br />
    <br />
    <div v-for="room of roomList" v-bind:key="room.id">
      <div class="card post-card">
        <div class="card-body">
          <p class="card-text">{{ room.description }}</p>
        </div>
        <div class="card-footer post-footer">
          <div class="post-footer-left">
            <nuxt-link :to="'/profile/profile_refer?user_id=' + room.user_id" target="_blank">
              <ImageIconComponent :imgSrc="room.image_url" :size="iconSize" :otherFlg="'true'" />
            </nuxt-link>
            &nbsp;&nbsp;&nbsp;&nbsp;{{ room.user_name }}
          </div>
          <div class="post-reference post-footer-right" v-if="!roomInfo">
            <button class="btn btn-dark" @click="enterRoomFunction({room})">部屋に入る</button>&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <br />
    </div>
    <AddPersonalChatRoomModalComponent :category="category" :collectionName="collectionName" />
    <EnterChatRoomComponent
      :category="category"
      :collectionName="collectionName"
      :enterRoom="enterRoom"
    />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapActions, mapState } from "vuex";
import apiMixin from "~/mixins/apiMixin.js";
import commonMixin from "~/mixins/commonMixin.js";
import AddPersonalChatRoomModalComponent from "~/components/chat/personal_room/AddPersonalChatRoomModalComponent.vue";
import EnterChatRoomComponent from "~/components/chat/personal_room/EnterChatRoomComponent.vue";

export default {
  computed: {
    ...mapState("masterStore", ["master"]),
    ...mapState("persnalChatStore", ["roomInfo"]),
    ...mapState("userStore", ["userInfo"]),
  },
  mixins: [apiMixin, commonMixin],
  props: ["category"],
  components: {
    AddPersonalChatRoomModalComponent,
    EnterChatRoomComponent,
  },
  data() {
    return {
      collectionName: undefined,
      categoryName: undefined,
      blockUserList: [],
      roomList: [],
      enterRoom: undefined,
      iconSize: 50,
    };
  },
  async created() {
    // モーダルを非表示
    this.$modal.hide("add-room-modal-content");
    this.$modal.hide("enter-room-modal-content");
    // カテゴリー名を取得
    const categoryObj = this.master.chat_category_list.find(
      (c) => c.key == this.category
    );
    this.categoryName = categoryObj.value;
    // ブロック状態のユーザを取得
    const result = await this.getReponseApi(
      this.$axios,
      "chat/get_block_users_each"
    );
    if (result.status == 200) {
      this.blockUserList = result.block_users;
    }
    // コレクション名の設定
    const db = firebase.firestore();
    this.collectionName = "room_personal_chat_" + this.category;
    const roomCollection = db.collection(this.collectionName);
    // リアルタイムの更新反映
    roomCollection.limit(100).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const roomInfo = change.doc.data();
        // 追加
        if (change.type === "added") {
          // ブロックリストにない場合は追加
          if (!this.blockUserList.some((b) => b == roomInfo.user_id)) {
            this.roomList = [
              ...this.roomList,
              {
                id: change.doc.id,
                user_id: roomInfo.user_id,
                user_name: roomInfo.user_name,
                image_url: roomInfo.image_url,
                description: roomInfo.description,
              },
            ];
          }
        } else if (change.type === "removed") {
          // 削除
          this.roomList = this.roomList.filter((r) => r.id != change.doc.id);
        }
      });
    });
  },
  methods: {
    ...mapActions("flashMessageStore", ["updateFlashMessageDisp"]),
    ...mapActions("persnalChatStore", ["updateRoomInfo"]),
    addRoom() {
      // 部屋作成のモーダルを表示
      this.$modal.show("add-room-modal-content");
    },
    enterRoomFunction(param) {
      this.enterRoom = param.room;
      // 部屋入室のモーダルを表示
      this.$modal.show("enter-room-modal-content");
    },
  },
};
</script>

<style>
.post-card {
  max-width: 500px;
  margin: 0 auto;
}
.post-footer {
  position: relative;
  height: 70px;
}
.post-footer-left {
  position: absolute;
  left: 5;
}
.post-footer-right {
  position: absolute;
  right: 0;
}
</style>
