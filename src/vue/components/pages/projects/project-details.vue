<script>
    import Project from '@classes/Project';
    import delayTool from '@tools/delay-tool';
    import autoSaver from '@components/elements/auto-saver';

    export default {
        name: 'project-details',
        components: {
            autoSaver
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
                return 'status' + this.clone.projectStatus;
            }
        },
        methods: {
            updateClone() {
                this.clone = new Project(this.project.toBackend());
            },
            update() {
                // const callback = () => {
                //     this.$store.dispatch('projects/update', this.clone).then((response) => {
                //         console.log('project update');
                //     })
                // };
                // delayTool.delay(callback);
            },
            remove() {
                var message = 'Wil je ' + this.clone.projectName + ' echt verwijderen?';

                //modal.confirm(message, (result) => {
                //if (result) {
                this.$store.dispatch('projects/delete', this.clone).then((response) => {
                    this.$store.commit('projects/unsetCurrent');
                    console.log('project removed');
                });
                //}
                //});
            }
        },
        watch: {
            project: function (val) {
                this.updateClone();
            }
        }
    }
</script>


<template>
    <div class="project-details">
        <div class="panel">
            <div class="panel-section">
                <input
                    type="text"
                    v-model="clone.projectName"
                    class="project-detail-project-name"
                    @keyup="update()"><br>

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
                            v-model="clone.contactId"
                            @change="update()"
                            placeholder="Client">
                        <md-option
                                v-for="(client, index) in clients"
                                :value="client.id"
                                :key="index">{{client.name}}</md-option>
                    </md-select>
                </md-field>
            </div>

            <div id="project-detail-hour-information" class="panel-section">
                <input class="input-small"
                    title="Projecturen"
                    v-model="clone.hours"
                    @keyup="update()"> ×

                <input class="input-small"
                    title="Uurtarief"
                    v-model="clone.rate"
                    @keyup="update()">

                <input
                    class="input-small"
                    title="Munt"
                    v-model="clone.currency"
                    @keyup="update()">  -

                <input
                    class="input-small"
                    title="Korting / Correctie"
                    v-model="clone.discount"
                    @keyup="update()">
            </div>

            <div class="panel-section">
                <input
                    class="input-medium"
                    title="boekjaar"
                    v-model="clone.year"
                    @keyup="update()">
            </div>

            <div
                id="project-detail-status-information"
                class="'panel-section status-' + clone.projectStatus">
                <div class="status-label project-status"></div>
                <div class="status-label-text">
                    {{status}}
                </div>
            </div>

            <div class="panel-section" ng-if="clone.projectStatus === 2">
                <input type="checkbox" v-model="clone.finished" @keyup="update()"> Afgerond
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
            :store-get="'projects/getItemById'"
            :store-update="'projects/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-details {

    }
</style>