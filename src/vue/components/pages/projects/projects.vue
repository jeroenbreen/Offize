<script>
    import projectSearch from './project-search';
    import projectDetails from './project-details';
    import projectCreate from './project-create';
    import projectLabel from './project-label';

    export default {
        name: 'projects',
        components: {
            projectSearch, projectCreate, projectDetails, projectLabel
        },
        props: {},
        computed: {
            currentProject() {
                return this.$store.state.projects.current;
            },
            projects() {
                return this.$store.getters['projects/getFiltered'](['projectName']);
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
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .projects {

        .projects__tools {
            width: 50%;
            max-width: 500px;
            padding-right: 20px;
            height: 100%;
        }
    }
</style>