<template>
    <div id="app" class="wrapper">
        <readme></readme>
    </div>
</template>
<script>
    import readme from './readme'

    export default {
        name: "app",
        components: {
            readme,
        }
    };
</script>

<style>
    #app {
        width: 90%;
        margin: 0 auto;
    }

</style>
