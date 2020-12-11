<template>
  <div class="im-user-item" @click="bindClick({ key:'user', value: item })">
    <img v-if="item.avatar" :src="item.avatar" :style="coverSize" class="im-user-avatar" />
    <div class="im-user-info">
      <p>{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserItem",
  props: {
    // 配置信息
    item: {
      type: Object,
      default: () => ({
        img: "",
        name: "测试",
        dept: "",
      }),
      required: true,
    },
    size: {
      type: Number,
      default: 25,
    },
  },
  data() {
    return {};
  },
  computed: {
    coverSize() {
      let size = this.size;
      if (`${size}`.match(/\d$/)) {
        size += "px";
      }
      return {
        width: size,
        height: size,
      };
    },
  },
  methods: {
    bindClick(data) {
      this.$emit("click", data);
    },
  },
};
</script>
