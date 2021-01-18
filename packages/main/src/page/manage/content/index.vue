<script>
// 修改方式待定

import groupItem from "./group";
import friendItem from "./friend";

export default {
  name: "manage-content",
  components: {
    groupItem,
    friendItem,
  },
  props: {
    current: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    bindEvent(event, data) {
      this.$emit("bindEvent", event, data);
    },
    handleEvent(event, data) {
      this.bindEvent(event, data);
    },
  },
  render(h) {
    const { current, handleEvent } = this;
    let el_content, data_content;
    if (current) {
      let { item, type } = current;
      if (type === "group") {
        data_content = {
          props: {
            item,
          },
          on: {
            bindEvent: function(event, data) {
              handleEvent(event, data);
            },
          },
          ref: "ManageContent",
        };
        el_content = <group-item {...data_content}></group-item>;
      } else if (type === "friend") {
        data_content = {
          props: {
            item,
          },
          on: {
            bindEvent: function(event, data) {
              handleEvent(event, data);
            },
          },
          ref: "ManageContent",
        };
        el_content = <friend-item {...data_content}></friend-item>;
      }
    } else {
      el_content = <div class="manager-item"></div>;
    }
    return el_content;
  },
};
</script>


