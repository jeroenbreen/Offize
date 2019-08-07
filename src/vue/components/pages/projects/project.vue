<script>
    import Project from '@classes/Project';
    import projectDetails from './project-details';
    import projectDocuments from './project-documents';
    import projectComments from './project-comments';
    import closeMixin from '@mixins/close';

    export default {
        name: 'project',
        components: {
            projectDetails, projectDocuments, projectComments
        },
        mixins: [closeMixin],
        props: {
            project: {
                type: Project,
                required: true
            }
        },
        computed: {},
        methods: {
            close() {
                this.$store.commit('projects/unsetCurrent');
                localStorage.currentProject = null;
            }
        }
    }
</script>


<template>
    <div class="project overlay">
        <div class="popup__container popup__container--full">
            <div class="popup">
                <div class="popup__content">
                    <project-details
                            :project="project"/>

                    <div class="project__documents">
                        <project-documents
                                :doctype="'quotation'"
                                :label="['Offertes', 'Offerte']"
                                :project="project"/>

                        <project-documents
                                :doctype="'invoice'"
                                :label="['Facturen', 'Factuur']"
                                :project="project"/>

                    </div>

                    <project-comments
                            :project="project"/>
                </div>
            </div>
            <div
                @click="close()"
                class="popup__close">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project {

        .popup__content {
            display: flex;
            background: $grey-soft!important;

            .project-details,
            .project__documents,
            .project-comments {
                width: 400px;
                margin-right: 20px;
                height: 100%;
                overflow: auto;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>