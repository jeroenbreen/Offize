<script>
    import projectSearch from './project-search';
    import projectDetails from './project-details';
    import projectCreate from './project-create';
    import projectLabel from './project-label';
    import projectDocuments from './project-documents';

    export default {
        name: 'projects',
        components: {
            projectSearch, projectCreate, projectDetails, projectLabel, projectDocuments
        },
        props: {},
        computed: {
            currentProject() {
                return this.$store.state.projects.current;
            },
            projects() {
                return this.$store.getters['projects/ordered'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="projects">
        <div class="projects__tools">
            <project-create/>
            <project-search/>
            <div class="projects__search-results">
                <project-label
                        v-for="(project, index) in projects"
                        :key="index"
                        :project="project"/>
            </div>
        </div>

        <project-details
            v-if="currentProject"
            :project="currentProject"/>

        <div
            v-if="currentProject"
            class="project__relations">
            <project-documents
                    :doctype="'quotation'"
                    :label="['Offertes', 'Offerte']"
                    :project="currentProject"/>

            <project-documents
                :doctype="'invoice'"
                :label="['Facturen', 'Factuur']"
                :project="currentProject"/>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .projects {
        display: flex;

        .projects__tools {
            width: 50%;
            max-width: 500px;
            margin-right: 20px;
            height: 100%;
        }

        .project-details {
            margin-right: 20px;
        }
    }
</style>