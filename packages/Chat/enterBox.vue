<script>
import { on, off } from "../util/dom";

export default {
  name: "MChat-enter-box",
  componentName: "MChatEnterBox",
  props: {
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    value: {
      default: "",
    },
  },
  data() {
    return {
      currentContent: "",

      setBoxDisplay: false,
      // 发送模式
      enter: true,
    };
  },
  watch: {
    value: {
      handler() {
        this.currentContent = this.value;
      },
      immediate: true,
    },
    currentContent: {
      handler(newval) {
        const msg = newval;
        this.$emit("input", msg);
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    doToggle() {
      this.setBoxDisplay = !this.setBoxDisplay;
    },
    selectEnter(flag) {
      this.enter = flag;
    },
    handleDocumentClick(e) {
      let reference = this.$refs.reference;
      let setting = this.$refs.setting;
      if (
        !setting ||
        !reference ||
        setting.contains(e.target) ||
        reference.contains(e.target)
      )
        return;
      this.setBoxDisplay = false;
    },
    // 数据格式往上抛
    handleSend() {
      if (!this.currentContent) return;
      this.$emit("submit", this.currentContent);
      this.$nextTick(() => {
        this.currentContent = "";
      });
    },
  },
  destroyed() {
    off(document, "click", this.handleDocumentClick);
  },
  mounted() {
    on(document, "click", this.handleDocumentClick);
  },
  render(h) {
    let {
      handleSend,
      enter,
      placeholder,
      selectEnter,
      setBoxDisplay,
      doToggle,
    } = this;
    var self = this;
    const textareaVnode = h("textarea", {
      domProps: {
        value: self.currentContent,
        placeholder,
      },
      on: {
        input: function (event) {
          self.currentContent = event.target.value;
        },
        keydown: function (ev) {
          let keyCode = ev.keyCode;
          let ctrlKey = ev.ctrlKey;
          if (ctrlKey && keyCode === 13 && !enter) {
            handleSend();
          }
          if (keyCode === 13 && enter) {
            if (ctrlKey) {
              self.currentContent += "\n";
            } else {
              ev.preventDefault();
              handleSend();
            }
          }
        },
      },
    });
    let enter_prompt = enter
      ? "按Enter发送，按住Ctrl+Enter换行"
      : "按Ctrl+Enter发送，按住Enter换行";

    let el_enter_box = (
      <div>
        <div class="im-chat-textarea">{textareaVnode}</div>
        <div class="im-chat-bottom">
          <div class="im-chat-btn-bar">
            <span
              class="im-btn-send"
              on-click={() => {
                handleSend();
              }}
              title={enter_prompt}
            >
              发送(<font style="text-decoration: underline;">S</font>)
            </span>
            <span class="im-send-set" on-click={() => doToggle()} ref="setting">
              <em class="icon-edge"></em>
            </span>
            <ul
              ref="reference"
              class={{
                "im-menu-box": true,
                display: setBoxDisplay,
              }}
            >
              <li
                class={{ "im-this": enter }}
                on-click={() => selectEnter(true)}
              >
                <i class="im-icon el-icon-check"></i>
                按Enter键发送消息
              </li>
              <li
                class={{ "im-this": !enter }}
                on-click={() => selectEnter(false)}
              >
                <i class="im-icon el-icon-check"></i>按Ctrl+Enter键发送消息
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
    return el_enter_box;
  },
};
</script>