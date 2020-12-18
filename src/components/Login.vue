<template>
    <div id="app" class="wrapper">
        <m-dialog
                title="MChat"
                :visible.sync="show"
        >
            <div style="width: 439px;padding: 20px;">
                <div class="input">
                    <input type="text" placeholder="账号">
                </div>
                <div class="input">
                    <input type="password" placeholder="密码">
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
            <span slot="footer" class="dialog-footer">
               <div style="padding: 10px">

                     <span class="register">注册账号</span>
                      <button class="m-button m-button-primary" style="width: 235px">
                        <span>登 录</span>
                        </button>
                </div>
  </span>
        </m-dialog>

    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                show: true
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