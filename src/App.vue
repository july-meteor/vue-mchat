<template>
    <div id="app" class="wrapper">
        <!--<i-chat-test></i-chat-test>-->
        <m-chat-test></m-chat-test>

    </div>
</template>
<script>
    import IChatTest  from  './test/IChatTest';
    import MChatTest from  './test/MChatTest'



    export default {
        name: "app",
        components:{
            IChatTest,
            MChatTest
        },
        data() {
            return {


            };
        },
        methods: {

        },
        mounted() {

        },
    };
</script>

<style lang="scss">

</style>
