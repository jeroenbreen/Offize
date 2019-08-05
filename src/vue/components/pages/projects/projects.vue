<script>
    import projectSearch from './project-search';
    import projectCreate from './project-create';
    import projectLabel from './project-label';
    import project from './project';

    export default {
        name: 'projects',
        components: {
            projectSearch, projectCreate, projectLabel, project
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
        <project-create/>

        <div class="page__list">
            <project-search/>
            <div class="page__search-results">
                <project-label
                        v-for="(project, index) in projects"
                        :key="index"
                        :project="project"/>
            </div>
        </div>

        <project
            v-if="currentProject"
            :project="currentProject"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .projects {
        height: 100%;
        display: flex;

        .project-create {
            width: 400px;
            margin-right: 20px;
        }

        .projects__list {
            width: calc(100% - 420px);
            height: 100%;

            .project-search {
                height: 80px;
            }

            .projects__search-results {
                height: calc(100% - 80px);
                overflow: auto;
            }
        }
    }
</style>