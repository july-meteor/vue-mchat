<template>
    <div id="app" class="wrapper">
        <login></login>
    </div>
</template>

<script>
    import Login from './components/Login'

    export default {
        name: "app",
        components: {
            Login
        },
        data() {
            return {}
        }
    }
</script>
