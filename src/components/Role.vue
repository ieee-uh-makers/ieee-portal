<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col lg="8">
                <h1 class="display-4 mb-3">{{ title }}</h1>

                <b-form @submit="onSubmit">
                    <b-form-group label="Name">
                        <b-form-input v-model="role.Name"/>
                    </b-form-group>

                    <h2 class="mb-3">Access Control</h2>

                    <b-table :items="actions" :fields="actionFields">
                        <template v-slot:cell(Enable)="row">
                            <b-checkbox v-model="row.item.IsEnabled"/>
                        </template>
                    </b-table>

                    <b-button-toolbar class="my-2 justify-content-center">
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-button-toolbar>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import RoleService from "../services/RoleService";
    import ActionService from "../services/ActionService";

    export default {
        name: "Role",
        data() {
            return {
                role: {
                    Id: 0,
                    Name: '',
                    IsEnabled: false
                },
                actionFields: [
                    {key: 'Name'},
                    {key: 'Action'},
                    {key: 'Enable'}
                ],
                actions: []
            }
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();
            },
            getRole(id) {
                return RoleService.get({Id: id})
                    .then(result => {
                        if (result.status === 'Good') {
                            this.role = result.resource;
                        } else {
                            throw new Error(result.statusDetails);
                        }
                    })
            },
            getActions() {
                return ActionService.getAll()
                    .then(result => {
                        if (result.status === 'Good') {
                            this.actions = result.resource;
                        } else {
                            return new Error(result.statusDetails);
                        }
                    })
            }
        },
        created() {
            this.getActions()
                .then(() => {
                    let id = parseInt(this.$route.params.RoleId);

                    if (id) {
                        return this.getRole(id);
                    }
                })
                .catch(error => {
                    this.$emit('UpdateAlertBox', 'danger', error.message);
                })
        },
        computed: {
            title() {
                if (this.role.Name.length) {
                    return this.role.Name
                } else {
                    if (parseInt(this.$route.params.RoleId)) {
                        return "Role"
                    } else {
                        return "Add Role"
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>