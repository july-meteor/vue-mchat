<template>
  <div>
    <notice-box :items="notices" @click="bindClick"></notice-box>
    <user-list :list="_list" v-model="filter" @click="bindClick"></user-list>
  </div>
</template>
<script>
import NoticeBox from "./component/NoticeBox";
import UserList from "./component/UserList";

/**
 *  开发思路
 * 1、内部维护 list 通过提供方法来修改 内部数据
 *    这种方案存在一种问题，如果方法不够全面则会造成封装残缺
 * 2、提供基础method及view mode 由上层提供
 */

function noop() {
  return [];
}

export default {
  name: "mchat-group-list",
  componentName: "MChatGroupList",
  components: {
    NoticeBox,
    UserList,
  },
  props: {
    notices: {
      type: Array,
      default: noop,
    },
    userList: {
      type: Array,
      default: noop,
    },
    filterUserMethod: Function,
  },
  computed: {
    _list() {
      let list = this.userList;
      let value = this.filter;
      list.forEach((item) => {
        if (this.filterUserMethod) {
          item.visible = this.filterUserMethod(value, item);
        } else {
          item.visible = true;
        }
      });
      return list;
    },
  },
  data() {
    return {
      filter: "",
    };
  },
  created() {
    // 放弃方案一
    // this.handleUserList();
    // this.handleNotices();
  },
  methods: {
    bindClick(event) {
      this.$emit("click", event);
    },
    // handleNotices() {
    //   let list = this.getNotics(this.config);
    //   this.notices = list;
    // },
    // handleUserList() {
    //   let list = this.getUserList(this.config);
    //   this.userList = list;
    // },
  },
};
</script>