<template>
    <div id="app" class="wrapper">
         <apply-test></apply-test>
    </div>
</template>

<script>
    import applyTest from './test/applyTest'

    export default {
        name: "app",
        components: {
            applyTest
        },
        data() {
            return {}
        },
        mounted(){

        }
    }
</script>
