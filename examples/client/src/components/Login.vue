<template>
    <div id="app" class="wrapper">
        <m-dialog
                title="MChat"
                :shrink="true"
                :showClose="false"
                :visible.sync="show"
        >
            <div v-if="!register">
                <div style="width: 439px;padding: 20px;">
                    <div class="input">
                        <input type="text" v-model="loginForm.account" placeholder="账号">
                    </div>
                    <div class="input">
                        <input type="password" v-model="loginForm.password" placeholder="密码">
                    </div>
                </div>
                <div class="funGroup">
                    <input type="checkbox" class="fun" value="自动登录">
                    <span>
                        自动登录
                    </span>

                </div>
                <div class="funGroup">
                    <input type="checkbox" class="fun" value="记住密码"> <span>
                       记住密码
                    </span>
                </div>
                <div class="funGroup">
                     <span>
                        找回密码
                    </span>
                </div>
                <div style="padding: 10px">
                    <span class="register" @click="register=true">注册账号</span>
                    <button class="m-button m-button-primary" @click="handlerLogin" style="width: 235px">
                        <span>登 录</span>
                    </button>
                </div>
            </div>
            <div v-else>
                <div style="width: 439px;padding: 20px;">
                    <div class="input">
                        <input type="text" v-model="registerForm.name" placeholder="昵称">
                    </div>
                    <div class="input">
                        <input type="text" v-model="registerForm.account" placeholder="账号">
                    </div>
                    <div class="input">
                        <input type="password" v-model="registerForm.password" placeholder="密码">
                    </div>
                </div>
                <div style="padding: 10px">
                    <span class="register" @click="register=false">返回</span>
                    <button class="m-button m-button-primary" @click="handlerRegister" style="width: 235px">
                        <span>注  册</span>
                    </button>
                </div>
            </div>
        </m-dialog>


    </div>
</template>

<script>
    import {register, login} from '../api/login'

    const defaultLoginForm = {
        account: undefined,
        password: undefined,
    }


    const defaultRegisterForm = {
        account: undefined,
        name: undefined,
        password: undefined,
    }

    export default {
        name: "app",
        data() {
            return {
                show: true,
                register: false,
                registerForm: Object.assign({}, defaultRegisterForm),
                loginForm: Object.assign({}, defaultLoginForm),
            }
        },
        methods: {
            // 账号注册
            handlerRegister() {
                register(this.registerForm).then(res => {
                    const {flag, msg, data} = res;
                    if (!flag) {
                        alert(msg);
                        return
                    }
                    alert("注册成功");
                    this.registerForm = Object.assign({}, defaultRegisterForm);
                    this.register = false;
                })
            },
            handlerLogin() {
                login(this.loginForm).then(res => {
                    const {flag, msg, data} = res;
                    if (!flag) {
                        alert(msg);
                        return
                    }
                    const {token} = data;
                    sessionStorage.setItem("token", token);
                    this.$emit("login");
                })
            }
        }
    }
</script>

<style scoped>
    .fun {
        margin-right: 5px;
    }

    .register {
        font-size: 14px;
        position: absolute;
        left: 15px;
        color: #A6A6A6;
        bottom: 15px;
    }

    .funGroup {
        width: 100px;
        display: inline-block;
        color: #A6A6A6;
    }

    .funGroup:hover, .register:hover {
        color: #409eff;
    }

    .input {
        height: 45px;
        width: 100%;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s;
    }

    input[type="text"], input[type="password"] {
        /*background-color: rgb(250, 255, 189);*/
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, .15);
        padding-left: 1em;
        width: 23em;
        height: 2.8em;
        margin-bottom: 1.2em;
    }


</style>