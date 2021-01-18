<template>
    <div>
        <notice-box :items="notices" @click="bindClick"></notice-box>
        <user-list :list="_list" v-model="filter" @click="bindClick"></user-list>
    </div>
</template>
<script>
import NoticeBox from './NoticeBox';
import UserList from './UserList'

function noop() {
    return [];
}

    export default {
        name: "drawer-box",
        componentName: "group-list",
        components: {
            NoticeBox,
            UserList,
        },
        props: {
            notices: {
                type: Array,
                default: noop,
            },
            userList: {
                type: Array,
                default: noop,
            },
        },
        computed: {
            _list() {
                let list = this.userList;
                let value = this.filter;
                list.forEach((item) => {
                        item.visible = this.filterUserMethod(value, item);
                });
                return list;
            },
        },
        data() {
            return {
                filter: "",
            };
        },
        created() {

        },
        methods: {
            bindEvent(event,data){
                this.$emit("bindEvent",event, data)
            },
            bindClick(event) {
                this.bindEvent("clickGroupUser", event);
            },
            filterUserMethod(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
        },
    };
</script>