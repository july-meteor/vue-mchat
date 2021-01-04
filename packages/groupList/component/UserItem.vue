<template>
    <div class="im-user-item" @dblclick="bindClick({ key:'user', value: item })">
        <img :src="avatar" :style="coverSize"
             :class="['im-user-avatar', item.online ?'':'offline']"/>
        <div class="im-user-info">
            <p>{{item.name}}</p>
        </div>
        <div class="im-user-role">
            <i v-if="item.role" :class="['m-icon-user',item.role]"></i>
        </div>

    </div>
</template>
<script>
    import {default_avatar} from '../../util/constant'

    export default {
        name: "UserItem",
        props: {
            // 配置信息
            item: {
                type: Object,
                default: () => ({
                    img: "",
                    name: "测试",
                    dept: "",
                }),
                required: true,
            },
            size: {
                type: Number,
                default: 25,
            },
        },
        data() {
            return {};
        },
        computed: {
            avatar() {
                return this.item.avatar || default_avatar;
            },
            coverSize() {
                let size = this.size;
                if (`${size}`.match(/\d$/)) {
                    size += "px";
                }
                return {
                    width: size,
                    height: size,
                };
            },
        },
        methods: {
            bindClick(data) {
                this.$emit("click", data);
            },

        },
    };
</script>
