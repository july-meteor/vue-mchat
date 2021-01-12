<template>
    <div id="app" class="wrapper">
        <!--<i-chat-test></i-chat-test>-->
        <m-chat-test></m-chat-test>

    </div>
</template>
<script>
    import MChatTest from  './test/MChatTest'



    export default {
        name: "app",
        components:{
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
