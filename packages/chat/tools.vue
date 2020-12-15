<template>
    <div class="im-chat-toolbar">
        <div class="im-chat-tools">
      <span class="im-chat-tool-item ">
        <el-popover placement="top-start" trigger="click" ref="popover">
          <div class="emoji-box">
            <ul>
              <li v-for="(item,key) in emojis" :key="item" @click="emojiEmit(key)">
                <img :src="item"/>
              </li>
            </ul>
          </div>
                <i slot="reference" class="m-icon-smile"></i>
        </el-popover>

      </span>
        </div>
    </div>
</template>

<script>
    import emojis from './emoji';

    export default {
        name: "chat-tools",
        componentName: "chatTools",
        props: {
            config: {
                type: Object,
                default: () => {
                },
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