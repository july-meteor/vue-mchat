<template>
  <div class="im-user-list">
    <ul>
      <li>
        <div class="list-title">成员(24/30)</div>
      </li>
      <li>
        <div class="im-list-filter">
          <input class="im-input-search" v-model="_value" placeholder="搜索成员" />
          <span class="im-input-search-prefix">
            <i class="im-icon el-icon-search"></i>
          </span>
        </div>
      </li>
    </ul>
    <ul class="list-box">
      <li v-for="(item,k) in list" :key="k" v-show="item.visible">
        <user-item :item="item" @click="bindClick" ></user-item>
      </li>
    </ul>
  </div>
</template>
<script>
import UserItem from "./UserItem";
export default {
  name: "UserList",
  components: {
    UserItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    value:{
      type:String,
      default:'',
    }
  },
  computed:{
    _value:{
      get(){
        return this.value
      },
      set(val){
        this.$emit('input',val)
      }
    }
  },
  methods: {
    bindClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style>
*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  height: 5px;
}
*::-webkit-scrollbar :hover{
  /*滚动条整体样式*/
  width: 5px;
  height: 5px;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  height: 10px;
  background: #9b9b9b;
}

*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 5px;
  background: #ededed;
}
</style>