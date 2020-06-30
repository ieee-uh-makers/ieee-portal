<template>
    <b-container fluid>
        <b-row>
            <b-col class="text-center">
                <img alt="IEEE Logo" src="../assets/ieee-mb-blue.png" class="mt-4">

                <h1 class="display-1">Portal</h1>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col sm="9" md="7" lg="5" xl="3">
                <b-form v-on:submit.prevent="onLoginButtonClicked" class="mt-5">
                    <b-form-group label="Username:">
                        <b-form-input type="text" v-model="loginInfo.Username" autocomplete="username" required autofocus/>
                    </b-form-group>

                    <b-form-group label="Password:">
                        <b-form-input type="password" v-model="loginInfo.Password" autocomplete="current-password" required/>
                    </b-form-group>

                    <b-button type="submit" variant="primary" :disabled="isLoading" block>Login</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import LoginService from "../services/LoginService"

    export default {
        name: "Login",
        data() {
            return {
                user: null,
                loginInfo: {
                    Username: '',
                    Password: ''
                },
                isLoading: false
            }
        },
        methods: {
            onLoginButtonClicked() {
                this.isLoading = true;
                this.$emit('UpdateAlertBox', 'loading');

                LoginService.login(this.loginInfo)
                    .then(result => {
                        if (result.status === 'Good') {
                            this.$emit('UpdateAlertBox', 'success');

                            this.user = result.resource;
                            localStorage.setItem("user", JSON.stringify(result.resource));

                            if (this.$route.query.path && (typeof this.$route.query.path === 'string')) {
                                this.$router.push({path: this.$route.query.path})
                            } else {
                                this.$router.push({name: 'Home'});
                            }
                        } else {
                            throw new Error(result.statusDetails);
                        }
                    })
                    .catch(error => {
                        this.$emit('UpdateAlertBox', 'danger', error.message);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            }
        },
        created() {
            this.$emit('UpdateAlertBox', 'ResetAlertBox');
        }
    }
</script>

<style scoped>

</style>