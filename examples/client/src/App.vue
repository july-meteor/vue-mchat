<template>

  <div id="app" class="wrapper">
    <login v-if="!user" @login="load"></login>
    <client v-else :user="user"></client>

  </div>

</template>

<script>
    import Login from './components/Login'
    import client from  './components/Client'
    import { load}  from './api/login'
    export default {
        name: "Main",
        components:{
            Login,
            client,
        },
        data(){
            return {
                // 当前用户
                user:undefined,
            }
        },
        methods:{
            load(){
                // 如果已经存入token则
                if (sessionStorage.getItem("token")) {
                    load().then(res =>{
                        const {flag ,data} =res;
                        if (!flag){
                            this.user = undefined;
                            return
                        }
                        this.user = data;
                    })
                }
            },
            disconnect(){
                this.socket.emit("disconnect", this.user.id);
            }
        },
        created(){
            this.load();
        },
        // 销毁前触发
        beforeDestroy(){
            if(!this.user.id){return};
        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>