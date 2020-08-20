<template>
  <div class="im-notice-box" style="resolve">
    <P class="title">群通知</P>
    <ul v-if="hasNotice">
      <li v-for="(item ,k) in items" :key="k" @click="bindClick('notice',item)">
        <span>【{{item.type}}】{{item.title}}</span>
      </li>
    </ul>
    <div v-else>
      <img class="im-notice-img" src="/static/images/unnotic.png" />
      <p class="unnoticed">暂时没有新通知</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoticeBox",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasNotice() {
      let flag = false;
      if (this.items.length > 0) {
        flag = true;
      }
      return flag;
    },
  },
  data() {
    return {};
  },
  methods: {
    bindClick(key, value) {
      this.$emit("click", { key, value });
    },
  },
};
</script>
