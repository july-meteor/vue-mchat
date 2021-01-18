<script>
export default {
  name: "message-item",
  props: {
    chat: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  watch: {
    chat(nv, ov) {
      console.log(nv);
      console.log(ov);
    },
  },
  methods: {
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleApplyFriend(event, item) {
      this.bindEvent(event);
    },
  },
  render(h) {
    const { bindEvent, chat } = this;
    const { messages } = chat;

    const el_message_items = this._l(messages, (model, index) => {
      let el_item;
      const { from, to, type, message, timestamp, status } = model;
      const { avatar, name } = from;

      if (type === "system") {
        el_item = (
          <li class="msg-box-system">
            <p>
              <em>系统：</em>
              {message}
              <span>{timestamp}</span>
            </p>
          </li>
        );
      } else if (type === "acceptFriend") {
        el_item = (
          <li>
            <img class="msg-box-avatar" src={avatar} />
            <p class="msg-box-user">
              {name} <span>{timestamp}</span>
            </p>
            <p class="msg-box-content">
              <span> {message}</span>
            </p>
          </li>
        );
      } else if (type === "applyFriend") {
        let el_item_box_btn = (
          <p class="msg-box-btn">
            <button
              class="m-button  m-button-primary"
              on-click={(ev) => bindEvent("acceptFriend", model)}
            >
              同意
            </button>
            <button
              class="m-button"
              on-click={(ev) => bindEvent("rejectFriend", model)}
            >
              拒绝
            </button>
          </p>
        );

        if (status === "accept") {
          el_item_box_btn = <p class="msg-box-btn"> 已同意 </p>;
        } else if (status === "reject") {
          el_item_box_btn = <p class="msg-box-btn"> 已拒接 </p>;
        }

        el_item = (
          <li>
            <img class="msg-box-avatar" src={avatar} />
            <p class="msg-box-user">
              {name} <span>{timestamp}</span>
            </p>
            <p class="msg-box-content">
              {" "}
              申请添加你为好友 <span>附言: {message}</span>
            </p>
            {el_item_box_btn}
          </li>
        );
      } else if (type === "rejectFriend") {
        el_item = (
          <li>
            <img class="msg-box-avatar" src={avatar} />
            <p class="msg-box-user">
              {name} <span>{timestamp}</span>
            </p>
            <p class="msg-box-content">
              <span>{message}</span>
            </p>
          </li>
        );
      }

      return el_item;
    });

    const el_message_box = (
      <div class="sys-msg-item">
        <ul class="sys-msg-box">
          {el_message_items}
          <div class="msg-box-more">
            <li class="msg-box-tips">暂无更多新消息</li>
          </div>
        </ul>
      </div>
    );

    return el_message_box;
  },
};
</script>

<style scoped></style>
