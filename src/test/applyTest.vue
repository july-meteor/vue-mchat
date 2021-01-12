<template>
    
</template>

<script>
    export default {
        name: "apply-test"
        ,mounted(){
            this.$applyGroup( '逍遥添加好友', {
                info:{
                    avatar:'http://www.julymeteor.com/upload/2020/02/03v3o95602h91rbphsd6h9qgdt.png',
                    name:'七月',
                    options:[
                        {
                            label:"分组1",
                            key:'',
                            value:'xxx'
                        }
                    ],
                    message:'您好!'
                },
            }).then((data) => {
                console.log(data)
            }).catch(() => {
                console.log(111)
            });
        }
    }
</script>

<style scoped>

</style>