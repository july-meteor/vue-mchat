<template>
  <div class="im-chat-toolbar">
    <div class="im-chat-tools">
      <span>
        <el-popover placement="top-start" trigger="click" ref="popover">
          <div class="emoji-box">
            <ul>
              <li v-for="(item,key) in emojis" :key="item" @click="emojiEmit(key)">
                <img :src="item" />
              </li>
            </ul>
          </div>
          <svg-icon slot="reference" iconClass="smiley"></svg-icon>
        </el-popover>
      </span>
    </div>
  </div>
</template>

<script>
import emojis from "@/utils/emoji";

export default {
  name: "chatTools",
  componentName: "chat-tools",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      emojis,
    };
  },
  created() {
  
  },
  methods: {
    emojiEmit(emoji) {
      let content = `emoji${emoji}`;
      this.$emit("emoji", content);
      // 窗口关闭
      this.$refs.popover.doClose();
    },
  },
};
</script>

<style scoped>
.face-box ul {
  position: relative;
  width: 372px;
  /* padding: 10px; */
  border: 1px solid #d9d9d9;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  list-style: none;
}
.face-box ul li {
  cursor: pointer;
  float: left;
  border: 1px solid #e8e8e8;
  height: 22px;
  width: 26px;
  /* overflow: hidden; */
  margin: -1px 0 0 -1px;
  padding: 4px 2px;
  text-align: center;
}

.svg-icon {
  margin-right: 12px;
  font-size: 22px;
  color: #888a91;
}
.svg-icon:hover {
  color: #76b1f9;
}
.emoji-box {
  background: #fff;
  height: 150px;
  width: 300px;
  overflow: auto;
  text-align: left;
}
.emoji-box ul {
  padding: 0;
}
.emoji-box li {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
}
</style>