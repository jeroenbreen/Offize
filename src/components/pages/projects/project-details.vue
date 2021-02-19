<script>
    import Project from '@/store/classes/Project';
    import autoSaver from '@/components/elements/auto-saver';
    import commonTools from '@/tools/common-tools';
    import projectStatusTools from './project-status-tools';

    export default {
        name: 'project-details',
        components: {
            projectStatusTools, autoSaver
        },
        props: {
            project: {
                type: Project,
                required: true
            }
        },
        data() {
            return {
                clone: new Project(this.project.toBackend())
            }
        },
        computed: {
            clients() {
                return this.$store.state.clients.all;
            },
            employees() {
                return this.$store.state.employees.all;
            },
            status() {
                let status = this.$store.getters['statusses/getItemById'](this.clone.projectStatus);
                return status ? status.title : '-';
            }
        },
        methods: {
            updateClone() {
                this.clone = new Project(this.project.toBackend());
            },
            remove() {
                var message, callback;
                message = 'Wil je ' + this.clone.projectName + ' echt verwijderen?';
                callback = () => {
                    this.$store.dispatch('projects/delete', this.clone).then((response) => {
                        this.$store.commit('projects/unsetCurrent');
                        console.log('project removed');
                    });
                };

                this.$store.commit('modal/confirm', {
                    message: message,
                    callback: callback
                });
            },
            archiveProject() {
                this.clone.projectStatus = 5;
            },
            deArchiveProject() {
                this.clone.projectStatus = 0;
            },
            prevStatus() {
                this.clone.projectStatus -= 1;
            },
            nextStatus() {
                this.clone.projectStatus += 1;
            },
            copySlug() {
                commonTools.clipboard(this.clone.toSlug());
            }
        },
        watch: {
            project: function (val, val2) {
                this.updateClone();
            }
        }
    }
</script>


<template>
    <div class="project-details">
        <div class="panel">
            <div class="panel-section">
                <h2>
                    Details
                </h2>
            </div>
            <div class="panel-section">
                <input
                    type="text"
                    v-model="clone.projectName"
                    class="project-details__project-name"><br>

                <div
                    @click="copySlug()"
                    class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-paperclip"></i>
                    </div>
                    <span>Kopieer slug: {{clone.toSlug()}}</span>
                </div>
            </div>

            <div class="panel-section">
                <md-field>
                    <md-select
                            v-model="clone.clientId"
                            placeholder="Client">
                        <md-option
                                v-for="(client, index) in clients"
                                :value="client.id"
                                :key="index">{{client.name}}</md-option>
                    </md-select>
                </md-field>
            </div>
            <div class="panel-section">
                <md-field>
                    <md-select
                            v-model="clone.employeeId"
                            placeholder="Employee">
                        <md-option
                                v-for="(employee, index) in employees"
                                :value="employee.id"
                                :key="index">{{employee.name}}</md-option>
                    </md-select>
                </md-field>
            </div>

            <div id="project-detail-hour-information" class="panel-section">
                <input class="input-small"
                    title="Projecturen"
                    v-model="clone.hours"> ×

                <input class="input-small"
                    title="Uurtarief"
                    v-model="clone.rate">

                <input
                    class="input-small"
                    title="Munt"
                    v-model="clone.currency">  -

                <input
                    class="input-small"
                    title="Korting / Correctie"
                    v-model="clone.discount">
            </div>

            <div class="panel-section">
                <input
                    class="input-medium"
                    title="boekjaar"
                    v-model="clone.year">
            </div>

            <div class="panel-section">
                <div class="status-indicator">
                    <div
                        :class="'status-' + clone.projectStatus"
                        class="status-indicator__icon project-status"></div>
                    <div class="status-indicator__label">
                        {{status}}
                    </div>

                    <project-status-tools
                            :project="clone"
                            :save="false"/>
                </div>


            </div>



            <div class="panel-section" ng-if="clone.projectStatus === 2">
                <md-checkbox v-model="clone.finished">Afgerond</md-checkbox>
            </div>
        </div>

        <div class="project-details__tools">
            <div
                    v-show="clone.projectStatus < 5"
                    @click="archiveProject()"
                    class="document-tool__container">
                <div
                        class="document-tool"
                        title="archiveer opdracht">
                    <i class="fas fa-archive"></i>
                </div>
                <span>Project archiveren</span>
            </div>


            <div
                v-show="clone.projectStatus === 5"
                @click="deArchiveProject()"
                class="document-tool__container">
                <div
                        class="document-tool"
                        title="Breng opdracht terug">
                    <i class="fas fa-reply"></i>
                </div>
                <span>Breng terug</span>
            </div>

            <div
                    @click="remove()"
                    class="document-tool__container">
                <div
                        class="document-tool document-tool--warning"
                        title="Verwijder opdracht">
                    <i class="fas fa-trash"></i>
                </div>
                <span>Project verwijderen</span>
            </div>
        </div>

        <auto-saver
            :watch="clone"
            :store-update="'projects/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-details {

        .project-details__project-name {
            font-size: 150%;
            padding: 12px;
            width: 100%;
            margin-bottom: 6px;
        }

        input {
            width: 50px;
        }

        .project-details__tools {
            padding: 12px;

            .document-tool__container {
                margin-bottom: 16px;
            }
        }

        .project-status-tools {
            margin-left: auto;
        }
    }
</style>