<script>
import { on, off } from "../../../../../../util/dom";

export default {
  name: "enter-box",
  componentName: "EnterBox",
  props: {
    placeholder: {
      type: String,
      default: "",
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
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    // 输入框对焦
    handleInputFocus() {
      this.$refs.input.focus();
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
      bindEvent,
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
      ref: "input",
      on: {
        input: function(event) {
          self.currentContent = event.target.value;
        },
        keydown: function(ev) {
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
        <div class="chat-enter">{textareaVnode}</div>
        <div class="enter-bar">
          <div class="enter-btn-bar">
            <span
              class="btn-close"
              title="关闭对话框"
              on-click={() => bindEvent("chatClose")}
            >
              关闭(<font style="text-decoration: underline;">C</font>)
            </span>
            <span
              class="btn-send"
              on-click={() => handleSend()}
              title={enter_prompt}
            >
              发送(<font style="text-decoration: underline;">S</font>)
            </span>
            <span
              class="btn-send-set"
              on-click={() => doToggle()}
              ref="setting"
            >
              <em class="icon-edge"></em>
            </span>
            <ul
              ref="reference"
              class={{
                "enter-send-menu": true,
                display: setBoxDisplay,
              }}
            >
              <li
                class={{ "send-this": enter }}
                on-click={() => selectEnter(true)}
              >
                <i class=" m-icon-select-bold"></i>
                按Enter键发送消息
              </li>
              <li
                class={{ "send-this": !enter }}
                on-click={() => selectEnter(false)}
              >
                <i class="m-icon-select-bold"></i>按Ctrl+Enter键发送消息
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
