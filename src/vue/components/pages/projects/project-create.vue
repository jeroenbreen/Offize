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
        computed: {},
        methods: {
            create() {
                this.$store.dispatch('projects/create', {...this.project}).then((response) => {
                    console.log('project created');
                });
            }
        }
    }
</script>


<template>
    <div class="project-create">
        <div class="panel panel--solo">
            <input
                    type="text"
                    placeholder="Projectname"
                    v-model="project.projectName"
                    class="input--full">

            <div class="panel__tools">
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

    }
</style>