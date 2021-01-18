<template>
  <div class="main-box-content">
    <div class="manager-page">
      <div class="manager-box">
        <div class="search-box">
          <span>加好友</span>
        </div>
        <ul class="manage-tab-content ">
          <tab-item
            type="group"
            title="群组"
            @itemClick="handleItemClick"
            @bindEvent="handleEvent"
            :selected="selected"
            :list="groups"
          ></tab-item>
          <span class="tab-divider">好友</span>
          <tab-item
            v-for="(item, index) in friends"
            @itemClick="handleItemClick"
            @bindEvent="handleEvent"
            type="friend"
            :title="item.name"
            :selected="selected"
            :key="index"
            :id="item.id"
            :list="item.userList"
          >
          </tab-item>
        </ul>
      </div>
      <!--成员信息-->
      <manage-content
        :current="current"
        @bindEvent="handleEvent"
      ></manage-content>
    </div>
  </div>
</template>

<script>
import TabItem from "./tabItem";
import ManageContent from "./content";

export default {
  name: "manage-page",
  components: {
    TabItem,
    ManageContent,
  },
  props: {
    friends: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 索引
      index: 0,
      selected: undefined,
      current: undefined,
    };
  },
  created() {},
  methods: {
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleEvent(event, data) {
      // switch (event){
      //     default:
      //
      //         break
      // }
      this.bindEvent(event, data);
    },
    handleItemClick(mark, data) {
      this.selected = mark;
      this.current = data;
    },
  },
};
</script>

<style scoped></style>
