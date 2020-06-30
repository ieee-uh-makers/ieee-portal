<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col lg="6">
                <h1 class="display-4 mb-3">Roles</h1>

                <b-button-toolbar class="my-2">
                    <b-button variant="primary" :to="{name: 'Role', params: {RoleId: 0}}">Add Role</b-button>
                </b-button-toolbar>

                <b-table responsive
                         :items="roles"
                         :fields="roleFields"
                         :busy="isLoading"
                         hover
                         @row-clicked="onRowClicked"
                >
                    <template v-slot:table-busy>
                        <div class="text-center text-success my-2">
                            <b-spinner class="align-middle"/>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import RoleService from "../services/RoleService";
    export default {
        name: "Members",
        data() {
            return {
                isLoading: false,
                roles: [],
                roleFields: [
                    {key: 'Name', sortable: true}
                ]
            }
        },
        methods: {
            getRoles() {
                return RoleService.getAll()
                    .then(result => {
                        if (result.status === 'Good') {
                            this.roles = result.resource;
                        } else {
                            throw new Error(result.statusDetails);
                        }
                    })
            },
            onRowClicked(row) {
                this.$router.push({name: 'Role', params: {RoleId: row.Id.toString()}})
            }
        },
        created() {
            this.isLoading = true;

            this.getRoles()
                .catch(error => {
                    this.$emit('UpdateAlertBox', 'danger', error.message);
                })
                .finally(() => {
                    this.isLoading = false;
                })
        }
    }
</script>

<style scoped>

</style>