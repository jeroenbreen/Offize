<script>
    import Project from '@classes/Project';

    export default {
        name: 'project-create',
        components: {},
        props: {},
        data() {
            return {
                project: new Project()
            }
        },
        computed: {
            clients() {
                return this.$store.state.clients.all;
            },
            employees() {
                return this.$store.state.employees.all;
            }
        },
        methods: {
            create() {
                if (this.project.employeeId && this.project.clientId) {
                    this.$store.dispatch('projects/create', this.project.toBackend()).then((response) => {
                        this.project = new Project();
                    });
                } else {
                    this.$store.commit('modal/message', {
                        message: 'Kies klant en werknemer'
                    });
                }
            }
        }
    }
</script>


<template>
    <div class="project-create">
        <div class="panel">
            <div class="panel-section">
                <input
                        type="text"
                        placeholder="Projectname"
                        v-model="project.projectName"
                        class="input--full">

                <md-field>
                    <md-select
                            v-model="project.clientId"
                            placeholder="Client">
                        <md-option
                                v-for="(client, index) in clients"
                                :value="client.id"
                                :key="index">{{client.name}}</md-option>
                    </md-select>
                </md-field>

                <md-field>
                    <md-select
                            v-model="project.employeeId"
                            placeholder="Employee">
                        <md-option
                                v-for="(employee, index) in employees"
                                :value="employee.id"
                                :key="index">{{employee.name}}</md-option>
                    </md-select>
                </md-field>
            </div>


            <div class="panel-section">
                <div
                        @click="create()"
                        class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-plus"></i>
                    </div>
                    <span>Add Project</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-create {

        .panel-section {

            > * {
                margin-bottom: 6px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>