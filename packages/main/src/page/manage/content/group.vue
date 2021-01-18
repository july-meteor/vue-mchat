<template>
  <div class="manager-item ">
    <div class="item-head group">
      <span class="item-avatar ">
        <img v-if="item.avatar" :src="item.avatar" />
      </span>
      <h4>{{ item.name }}</h4>
      <span>群号: 1234567456</span>
      <span>
        <i class="m-icon-message" @click="handleBuildChat"> </i>
        <i class="m-icon-chuangzuo"> </i>
      </span>
    </div>
    <div class="item-body group">
      <div class="body-item">
        <p>
          <em>
            群名称
          </em>
          <span>
            {{ item.name }}
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            群聊备注
          </em>
          <span>
            海喵突击队
          </span>
        </p>
      </div>
      <div class="divider divider--horizontal"><!----></div>

      <div class="body-item">
        <div class="group_notify">
          <p>
            <em>
              群公告
            </em>
            <span>
              {{ groupNotify }}
            </span>
          </p>
        </div>
      </div>
      <div class="divider divider--horizontal"><!----></div>

      <div class="body-item">
        <p>
          <em>
            我的群名片
          </em>
          <span>
            {{ item.mine }}
          </span>
        </p>
      </div>
      <div class="divider divider--horizontal"><!----></div>

      <div class="body-item">
        <p>
          <em>
            成员
          </em>
          <span> ({{ userCount }}人) </span>
        </p>
      </div>

      <div class="divider divider--horizontal"><!----></div>

      <div class="body-item">
        <div class="group_notify">
          <p>
            <em>
              群简介
            </em>
            <span>
              {{ item.introduce }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "group-item",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    groupNotify() {
      return this.item.notify || "暂无群公告";
    },
    userCount() {
      return this.item.userList.length;
    },
  },
  created() {},
  methods: {
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleEvent(event, data) {},
    //发起对话
    handleBuildChat() {
      this.bindEvent("buildChat", Object.assign({ type: "group" }, this.item));
    },
  },
};
</script>

<style scoped></style>
