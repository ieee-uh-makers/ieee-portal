<template>
    <div>
        <b-navbar toggleable="sm" class="mainMenu mb-4" v-show="user">
            <b-navbar-brand class="d-none d-sm-inline-block">
                <img alt="IEEE Logo" src="../assets/ieee-mb-blue.png" class="img-fluid" style="max-height:2rem">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" class="mr-auto"/>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="font-weight-bold">
                    <b-nav-item :to="{ name: 'Home'}">Home</b-nav-item>
                    <b-nav-item :to="{ name: 'Members'}">Members</b-nav-item>
                    <b-nav-item :to="{ name: 'Roles'}">Roles</b-nav-item>
                </b-navbar-nav>
            </b-collapse>

            <b-navbar-nav>
                <b-navbar-brand class="d-inline-block d-sm-none">
                    <img alt="Quasar Data Center Logo" src="../assets/ieee-mb-blue.png" class="img-fluid" style="max-height:2rem">
                </b-navbar-brand>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-text class="d-none d-sm-inline-block">Good {{ getTimeOfDay() }}, {{ name }}.</b-nav-text>
                <b-nav-item :to="{ name:'Logout'}" v-b-tooltip.hover title="Logout">
                    <b-icon icon="power" style="font-size:1.5rem"/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "MainMenu",
        data() {
            return {
                user: null,
                name: ""
            }
        },
        created() {
            this.getUser();

            this.$router.beforeEach((to, from, next) => {
                this.getUser();
                next();
            });
        },
        methods: {
            // allows the menu to test is the user is logged in
            getUser() {
                let userJson = localStorage.getItem('user');
                this.user = JSON.parse(userJson);

                if (this.user) {
                    this.name = this.user.DisplayName;
                } else {
                    this.name = '';
                }
            },
            getTimeOfDay() {
                const hours = new Date().getHours(); // 0-23

                if (hours < 12 - 1) {
                    return "morning";
                } else if (hours < 17 - 1) {
                    return "day";
                } else {
                    return "evening";
                }
            }
        }
    }
</script>

<style scoped>

</style>