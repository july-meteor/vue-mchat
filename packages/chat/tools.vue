<template>
    <div class="im-chat-toolbar">
        <div class="im-chat-tools">
      <span class="im-chat-tool-item " title="发送表情">
        <m-popover placement="top-start" trigger="click" ref="popover">
          <div class="emoji-box">
            <ul>
              <li v-for="(item,key) in emojis" :key="item" @click="emojiEmit(key)">
                <img :src="item"/>
              </li>
            </ul>
          </div>
                <i slot="reference" class="m-icon-smile"></i>
        </m-popover>
      </span>

            <span class="im-chat-tool-item" title="发送图片">
                  <i class="m-icon-picture"></i>
                <input ref="uploadImage" type="file" @change="uploadChange"/>
            </span>
            <!--<span class="im-chat-tool-item " title="发送文件">-->
                  <!--<i class="m-icon-file-open"></i>-->
                <!--<input ref="uploadImage" type="file" @change="uploadChange('file')"/>-->
            <!--</span>-->
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
            // 上传图片
            uploadChange(type) {
                const input = this.$refs.uploadImage;
                const file = input.files[0];
                const val = input.value;
                if (!val) {
                    return;
                }
                this.$refs.uploadImage.value='';
                let ext = this.config.fileExt | "" ;
                //校验文件
                switch (type) {
                    case 'file': //一般文件
                        if (ext && !RegExp('\\w\\.(' + ext + ')$', 'i').test(escape(val))) {
                            console.log("不支持该文件格式")
                            return input.value = '';
                        }
                        type = 'file';
                        break;
                    case 'video': //视频文件
                        if (!RegExp('\\w\\.(' + (ext || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(escape(val))) {
                            console.log("不支持该视频格式")
                            return input.value = '';
                        }
                        break;
                    case 'audio': //音频文件
                        if (!RegExp('\\w\\.(' + (ext || 'mp3|wav|mid') + ')$', 'i').test(escape(val))) {
                            console.log("不支持该音频格式")
                            return input.value = '';
                        }
                        break;
                    default: //图片文件
                        if (!RegExp('\\w\\.(' + (ext || 'jpg|png|gif|bmp|jpeg') + ')$', 'i').test(escape(val))) {
                            console.log("不支持该图片格式")
                            return input.value = '';
                        }
                        type = 'img';
                        break;
                }
                // 读取文件
                this.$emit("upload", {
                    type,
                    file,
                });
            }
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