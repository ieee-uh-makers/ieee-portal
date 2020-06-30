<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col lg="8">
                <b-breadcrumb :items="$route.meta.breadCrumbs"/>

                <h1 class="display-4 mb-3">{{ title }}</h1>

                <b-form @submit="onSubmit">
                    <b-form-group label="Display Name">
                        <b-form-input type="text"
                                      v-model="user.DisplayName"
                                      required
                                      ref="userFocus"
                                      placeholder="Enter the person's name"
                                      trim
                        />
                    </b-form-group>
                    <b-form-group label="Username">
                        <b-form-input type="text"
                                      v-model="user.Username"
                                      required
                                      trim
                        />
                    </b-form-group>
                    <b-form-group label="Password">
                        <b-form-input type="password"
                                      v-model="user.PlainTextPassword"
                        />
                    </b-form-group>
                    <b-form-group label="Confirm Password" v-show="user.PlainTextPassword.length">
                        <b-form-input type="password"
                                      v-model="user.PlainTextPassword2"
                        />
                    </b-form-group>
                    <b-form-group label="Points">
                        <b-form-input type="number" v-model="user.Points"/>
                    </b-form-group>
                    <b-form-group label="Role">
                        <b-form-select :options="roleOptions" v-model="user.RoleId"/>
                    </b-form-group>
                    <b-form-group label="Two Factor Authentication" v-show="user.Id">
                        <b-form-checkbox
                                v-model="isTFAEnabledNew"
                                :value="1"
                                :unchecked-value="0"
                                @change="onTFAToggled"
                        >
                            When checked, your logins will use your phone and password for additional security.
                        </b-form-checkbox>
                    </b-form-group>

                    <b-collapse v-model="isTFASetupShown">
                        <b-card title="Two Factor Authentication">
                            <b-container>
                                <b-row>
                                    <b-col>
                                        <b-row>
                                            <b-col>
                                                <qr-code :text="userTFAUri"/>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <div class="mt-3" style="font-size:0.9rem">{{ userTFAUriParts ? userTFAUriParts.secret : '' }}</div>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col>
                                        <h3>Step 1</h3>
                                        <p>Install <b-link href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US">Google Authenticator</b-link> on your phone.</p>

                                        <h3>Step 2</h3>
                                        <p>Scan the qr code with the app. You will see the app make temporary security codes. Enter the latest code below:</p>
                                        <b-input-group class="mb-3">
                                            <b-form-input v-model="user.TFAToken" placeholder="Code:" autocomplete="off"/>
                                        </b-input-group>

                                        <div v-show="user.TFAToken.length >= 6">
                                                <h3>Step 3</h3>
                                                <p>Hit 'submit' below to test your code and finish the setup.</p>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card>
                    </b-collapse>

                    <b-form-group class="mt-4" v-show="user.Id">
                        <b-form-checkbox
                                v-model="isDeleted"
                                :value="true"
                                :unchecked-value="false"
                        >
                            Delete this user
                        </b-form-checkbox>
                    </b-form-group>

                    <b-button-toolbar class="my-2 justify-content-center">
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-button-toolbar>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import MemberService from "../services/MemberService";
    import RoleService from "../services/RoleService";
    import QueryString from "querystring"

    export default {
        name: "Member",
        data() {
            return {
                isLoading: false,
                isDeleted: 0,
                isTFAEnabledOld: 0,
                isTFAEnabledNew: 0,
                isTFASetupShown: false,
                user: {
                    Id: 0,
                    DisplayName: '',
                    Username: '',
                    PlainTextPassword: '',
                    PlainTextPassword2: '',
                    RoleId: 1,
                    RoleName: 'Member',
                    Points: 0,
                    IsTFAEnabled: 0,
                    TFAToken: '',
                    CreatedAt: 0
                },
                roleOptions: [],
                userTFAUri: '',
                userTFAUriParts: null
            }
        },
        methods: {
            getMember(id) {
                this.isLoading = true;
                this.$emit('UpdateAlertBox', 'loading');

                MemberService.get({Id: id})
                    .then(result => {
                        if (result.status === 'Good') {
                            this.$emit('UpdateAlertBox', 'success', result.statusDetails);

                            Object.assign(this.user, result.resource);

                            this.isTFAEnabledOld = this.user.IsTFAEnabled;
                            this.isTFAEnabledNew = this.user.IsTFAEnabled;
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
            },
            getRoleOptions() {
                return RoleService.getAll()
                    .then(result => {
                        if (result.status === 'Good') {
                            let roles = result.resource;

                            for (const role of roles) {
                                let option = {
                                    value: role.Id,
                                    text: role.Name
                                };

                                this.roleOptions.push(option);
                            }
                        } else {
                            throw new Error(result.statusDetails);
                        }
                    })
            },
            onSubmit(e) {
                e.preventDefault();
                this.isLoading = true;
                this.$emit('UpdateAlertBox', 'loading');

                this.user.IsTFAEnabled = this.isTFAEnabledNew;

                if (this.user.Id) {
                    if (this.isDeleted) {
                        MemberService.remove(this.user)
                            .then(result => {
                                if (result.status === 'Good') {
                                    this.isLoading = false;
                                    this.$emit('UpdateAlertBox', 'success', result.statusDetails);

                                    this.$router.push({name: 'Users'})
                                } else {
                                    throw new Error(result.statusDetails);
                                }
                            })
                            .catch(error => {
                                this.$bvToast.toast('Scroll up for details.', {
                                    title: 'Error',
                                    variant: 'danger',
                                    solid: true
                                });

                                this.$emit('UpdateAlertBox', 'danger', error.message);
                            })
                            .finally(() => {
                                this.isLoading = false;
                            })
                    } else {
                        MemberService.update(this.user)
                            .then(result => {
                                if (result.status === 'Good') {
                                    let query = {};
                                    if (this.user.TFAToken.length && result.resource.IsTFAEnabled) {
                                        query = {
                                            AlertVariant: 'success',
                                            AlertText: "Hooray, you've setup two factor authentication!"
                                        };
                                    }

                                    this.$router.push({name: 'Users', query: query})
                                } else {
                                    this.$bvToast.toast('Scroll up for details.', {
                                        title: 'Error',
                                        variant: 'danger',
                                        solid: true
                                    });

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
                } else {
                    MemberService.add(this.user)
                        .then(result => {
                            if (result.status === 'Good') {
                                this.isLoading = false;
                                this.$emit('UpdateAlertBox', 'success', result.statusDetails);

                                this.$router.push({name: 'Users'})
                            } else {
                                this.$bvToast.toast('Scroll up for details.', {
                                    title: 'Error',
                                    variant: 'danger',
                                    solid: true
                                });

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
            onTFAToggled(flag) {
                this.isTFAEnabledNew = flag;

                if (this.isTFAEnabledNew) {
                    if (this.isTFAEnabledNew === this.isTFAEnabledOld) {
                        // do not show the form because tfa is already setup
                        this.isTFASetupShown = false;
                    } else {
                        // show the tfa setup form because tfa is not setup
                        this.isTFASetupShown = true;

                        MemberService.getTFAUri(this.user)
                            .then(result => {
                                if (result.status === 'Good') {
                                    this.userTFAUri = result.resource;
                                    this.userTFAUriParts = QueryString.decode(this.userTFAUri);
                                } else {
                                    throw new Error(result.statusDetails);
                                }
                            })
                            .catch(error => {
                                this.$emit('UpdateAlertBox', 'danger', error.message);
                            })
                    }
                } else {
                    this.user.TFAToken = '';

                    if (this.isTFAEnabledNew === this.isTFAEnabledOld) {
                        // hide the tfa form
                        this.isTFASetupShown = false;
                    } else {
                        // confirm the user wants to disable tfa first
                        this.$nextTick(() => {
                            this.isTFAEnabledNew = 1;
                        });

                        let message = 'Uncheck now?';

                        this.$bvModal.msgBoxConfirm(message)
                            .then(result => {
                                if (result) {
                                    this.isTFAEnabledNew = 0;
                                }
                            });
                    }
                }
            }
        },
        created() {
            this.$emit('ResetAlertBox');

            this.getRoleOptions()
                .then(() => {
                    let id = parseInt(this.$route.params.MemberId);

                    if (id) {
                        return this.getMember(id);
                    }
                })
                .catch(error => {
                    this.$emit('UpdateAlertBox', 'danger', error.message);
                })
        },
        mounted() {
            this.$refs.userFocus.focus();
        },
        computed: {
            title() {
                if (this.user.DisplayName.length) {
                    return this.user.DisplayName
                } else {
                    if (parseInt(this.$route.params.MemberId)) {
                        return "Member"
                    } else {
                        return "Add Member"
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>