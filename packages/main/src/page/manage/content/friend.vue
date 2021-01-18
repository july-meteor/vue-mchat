<template>
  <div class="manager-item ">
    <div class="item-head  friend">
      <span class="item-avatar">
        <img v-if="item.avatar" :src="item.avatar" />
      </span>
      <h4>{{ item.name }}</h4>
      <span>{{ item.sign }}</span>
      <span>
        <i class="m-icon-message" @click="handleBuildChat"> </i>
        <i class="m-icon-email"> </i> <i class="m-icon-QQ"> </i>
      </span>
    </div>
    <div class="item-body friend">
      <div class="body-item">
        <p>
          <em>
            IChat
          </em>
          <span>
            {{ item.cid }}
            <i class="m-icon-edit"></i>
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            昵称
          </em>
          <span>
            {{ item.name }}
          </span>
        </p>
      </div>
      <div class="body-item">
        <p>
          <em>
            备注
          </em>
          <span class="remark">
            {{ friendRemark }}
            <i class="m-icon-edit"></i>
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            分组
          </em>
          <span>
            {{ item.groupName }}
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            手机
          </em>
          <span>
            {{ item.iphone }}
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            邮箱
          </em>
          <span>
            {{ item.email }}
          </span>
        </p>
      </div>

      <div class="body-item">
        <p>
          <em>
            说明
          </em>
          <span>
            {{ friendIntroduce }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "friend-item",
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
    friendRemark() {
      return this.item.remark || "添加备注";
    },
    friendIntroduce() {
      return this.item.introduce || "这个人太懒了没有写";
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
      this.bindEvent("buildChat", Object.assign({ type: "friend" }, this.item));
    },
  },
};
</script>

<style scoped></style>
