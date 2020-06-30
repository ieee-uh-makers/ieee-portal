<template>
    <div></div>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            localStorage.removeItem('user');
            this.$router.push({name: 'Login'})
        }
    }
</script>

<style scoped>

</style>