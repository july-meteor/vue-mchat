<template>
  <li>
    <m-popover
      placement="right"
      width="100"
      trigger="right"
      ref="popover"
      v-model="visible"
    >
      <ul class="item-menu-box">
        <li @click="handleAddGroup">添加分组</li>
        <li @click="handleRenameGroup">分组重命名</li>
      </ul>
      <div
        class="item_title"
        @click="handleOpen"
        @contextmenu.prevent="handleOpenMenu"
        slot="reference"
      >
        <i :class="icon"></i>
        <span>{{ title }}</span>
        <em>({{ list.length }})</em>
      </div>
    </m-popover>

    <ul :class="['item_list', showClass]">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="activeClass(index)"
        @click="bindItemClick(item, index)"
        @dblclick="handleBuildChat(item)"
      >
        <div class="group_avatar" v-if="!item.avatar">
          <i class="m-icon-qunzu"></i>
        </div>
        <img
          v-else
          :src="item.avatar"
          :class="{ offline: type === 'friend' && !item.online }"
        />
        <span>{{ item.name }}</span>
        <p :title="item.sign">{{ item.sign }}</p>
      </li>
    </ul>
  </li>
</template>

<script>
import { generateId } from "../../../../util/util";

export default {
  name: "tab-item",
  props: {
    id: 0,
    selected: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "group",
    },
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      key: undefined,
      open: false,
      mark: undefined,
      visible: false,
    };
  },
  computed: {
    // 组件名
    icon() {
      return this.open ? "m-icon-arrow-down" : "m-icon-arrow-right";
    },
    showClass() {
      if (!this.open) {
        return;
      }
      return "list-show";
    },
  },
  created() {
    this.key = this.type + generateId();
  },

  methods: {
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleEvent(event, data) {},
    handleBuildChat(item) {
      item.type = this.type;
      this.bindEvent("buildChat", item);
    },
    //添加分组
    handleAddGroup() {
      this.bindEvent("addGroup");
    },
    // 分组重命名
    handleRenameGroup() {
      this.bindEvent("renameGroup", { id: this.id, name: this.title });
    },
    handleOpenMenu() {
      if (this.type === "friend") {
        this.visible = true;
      }
    },
    handleOpen() {
      this.open = !this.open;
    },
    // 这个选中方式 ，待改进
    bindItemClick(item, index) {
      let mark = `${this.type}-${this.key}-${index}`;
      item.groupName = this.title;
      this.$emit("itemClick", mark, { item, type: this.type });
    },
    activeClass(index) {
      let css = "";
      let mark = `${this.type}-${this.key}-${index}`;
      if (this.selected === mark) {
        css = "active";
      }
      return css;
    },
  },
};
</script>

<style lang="scss">
.item-menu-box {
  box-sizing: content-box;
  li {
    padding: 0 5px 0 25px;
    cursor: pointer;
    line-height: 25px;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
