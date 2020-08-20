<template>
  <div>
    <slot :chat="data"></slot>
  </div>
</template>
<script>
import { mergeOptions } from "./util";

export default {
  name: "chat-right-box",
  componentName: "ChatRightBox",
  props: {
    display: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    //会话信息
    chat() {
      let parent = this.$parent;
      return parent;
    },
  },
  created() {
    const { chat } = this.chat;

       //基本参数
   const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable'];
    let data = this.getPropsData(basicProps)
    data = mergeOptions(chat, data);
    this.data = data;
  
  },
  methods: {
    // 组装 props数据
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach((key) => {
            prev[key] = this[key];
          });
        }
        return prev;
      }, {});
    },
    //插槽渲染 编译slot的渲染
    compileSlotRender(slot) {
      // renderHeader 属性不推荐使用。
      let originRenderCell = slot.renderCell;
      // 这里进行渲染下
      // 对于展开行，renderCell 不允许配置的。在上一步中已经设置过，这里需要简单封装一下。
      slot.renderCell = (h, data) => (
        <div class="wapper">{originRenderCell(h, data)}</div>
      );
      return slot;
    },
  },
};
</script>