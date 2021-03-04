<template>
    <div class="readme">
        <div class="head">
            <div >
                <div class="project-name">
                    <b>VUE-MChat</b>
                    <span class="badge"> 1.2.0 </span>
                </div>
                <div class="project-summary">
                    一款基于 vue.js 开发的聊天室组件库
                </div>
                <div class="project-author">
                    JulyMeteor(七月流星)
                </div>
            </div>
            <div class="link">
                <span>项目地址</span>
                <span class="tag"><a href="https://github.com/july-meteor/vue-mchat" target="_blank">github</a></span>
                <span class="tag"><a href="https://gitee.com/july-meteor/vue-mchat" target="_blank">gitee</a></span>
                <span class="tag"><a href="http://www.julymeteor.com/im/" target="_blank">线上演示 </a></span>
            </div>
            <div>
                <img class="contact" :src="qq_group"/>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="tabs">
                    <ul class="tabs-nav">
                        <li @click="toggleTab('first')" :class="{'active':activeName === 'first'}">MChat API</li>
                        <li @click="toggleTab('second')" :class="{'active':activeName === 'second'}">IChat API</li>
                    </ul>
                </div>
                <div v-show="activeName === 'first'" class="tabs-content">
                    <m-chat-sample></m-chat-sample>
                </div>

                <div v-show="activeName === 'second'" class="tabs-content">
                    <i-chat-sample></i-chat-sample>
                </div>

            </div>


        </div>
    </div>


</template>

<script>
    import MChatSample from './MChatSample'
    import IChatSample from './IChatSample'

    export default {
        name: "readme",
        components: {
            MChatSample,
            IChatSample,
        },
        data() {
            return {
                activeName: "first",
                qq_group: require("../../public/avatar/qq_group.png")
            }
        }, methods: {
            toggleTab(name) {
                this.activeName = name;
            }
        }

    }
</script>

<style>

    .readme {
        background-color: #ffffff;

    }

    .contact {
        width: 200px;
        padding: 10px;
    }

    .head {
        position: relative;
        margin: 30px auto;
    }

    .project-name {
        padding: 10px;
        font-size: 36px;
    }

    .badge {
        position: absolute;
        top: -10px;
        left: 230px;
        background: #D20019;
        border-radius: 16px;
        color: #ffffff;
        font-size: 12px;
        padding: 4px 8px;
    }

    .project-summary {
        padding: 5px;
        font-size: 18px;
        color: #909399;
    }

    .link span {
        margin: 5px;
    }

    .tag {
        background-color: #ecf5ff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
    }

    .project-author {
        padding: 5px;
        font-size: 12px;
        color: #4CA2FB;
    }

    .contact {

    }

    .content {
        padding-bottom: 100px;
    }

    .title {
        font-size: 24px;
        line-height: 26px;
        border-left: 10px solid #409eff;
        padding-left: 15px;
        margin-bottom: 15px;
        margin-top: 30px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;
    }

    thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
    }

    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }

    table th {
        text-align: left;
        white-space: nowrap;
        color: #909399;
        border-bottom: 1px solid #dcdfe6;
        font-weight: 400;
    }

    table td {
        color: #606266;
        border-bottom: 1px solid #dcdfe6;
        padding: 15px;
        max-width: 250px;
    }

    .sample-code {
        display: block;
        border: 10px solid #F8F8F8;
        border-top-width: 0;
        padding: 10px;
        line-height: 20px;
        overflow: auto;
        background-color: #3F3F3F;
        color: #eee;
        font-size: 12px;
        font-family: Courier New;
    }

    * {
        margin: 0;
        padding: 0;
    }

    .tabs {
        display: block;
        width: 100%;
        border: 1px solid #e4e7ed;
        border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        white-space: nowrap;
        position: relative;
        transition: transform .3s;
        float: left;
        z-index: 1;
        padding: 0;
        margin: 0 0 15px;
    }

    .tabs-nav {
        border: 1px solid #e4e7ed;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        white-space: nowrap;
        position: relative;
        transition: transform .3s;
        float: left;
        z-index: 2;
        margin-bottom: -1px;

    }

    .tabs-nav li {
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        border-bottom: 1px solid transparent;
        border-left: 1px solid #e4e7ed;
        transition: color .3s cubic-bezier(.645, .045, .355, 1), padding .3s cubic-bezier(.645, .045, .355, 1);
    }

    .tabs-nav li.active {
        border-bottom-color: #fff !important;
    }

    .tabs-nav li:first-child {
        border-left: none;
    }

    .active {
        color: #409eff;
    }

    .tabs-content {
        display: block;
        border: 1px solid #e4e7ed;
        border-top: none;
        padding: 15px;
    }
</style>