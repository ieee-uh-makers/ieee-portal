<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col lg="8">
                <h1 class="display-4 mb-3">Members</h1>

                <b-button-toolbar class="my-2">
                    <b-button variant="primary" :to="{name: 'Member', params: {MemberId: 0}}">Add Member</b-button>
                </b-button-toolbar>

                <b-table responsive
                         :items="members"
                         :fields="memberFields"
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
    import MemberService from "../services/MemberService";
    export default {
        name: "Members",
        data() {
            return {
                isLoading: false,
                members: [],
                memberFields: [
                    {key: 'DisplayName', sortable: true},
                    {key: 'Points', sortable: true},
                    {key: 'RoleName', label: 'Role', sortable: true}
                ]
            }
        },
        methods: {
            getMembers() {
                return MemberService.getAll()
                    .then(result => {
                        if (result.status === 'Good') {
                            this.members = result.resource;
                        } else {
                            throw new Error(result.statusDetails);
                        }
                    })
            },
            onRowClicked(row) {
                this.$router.push({name: 'Member', params: {MemberId: row.Id.toString()}})
            }
        },
        created() {
            this.isLoading = true;

            this.getMembers()
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