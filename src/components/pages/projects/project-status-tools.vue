<script>
    import Project from '@/store/classes/Project';

    export default {
        name: 'project-status-tools',
        components: {},
        props: {
            project: {
                type: Project,
                required: true
            },
            save: {
                type: Boolean,
                required: true
            }
        },
        computed: {},
        methods: {
            prevStatus() {
                this.project.projectStatus -= 1;
                if (this.save) {
                    this.$store.commit('projects/setCurrentLight', this.project);
                    this.update();
                }
            },
            nextStatus() {
                this.project.projectStatus += 1;
                if (this.save) {
                    this.$store.commit('projects/setCurrentLight', this.project);
                    this.update();
                }
            },
            update() {
                this.$store.dispatch('projects/update', this.project.toBackend()).then((response) => {
                    console.log('update ' + this.project.projectName);
                    console.log('client update');
                })
            }
        }
    }
</script>


<template>
    <div class="project-status-tools">
        <div
            v-show="project.projectStatus > 0"
            @click="prevStatus()"
            class="document-tool document-tool--small"
            title="opdrachtstatus terug">
            <i class="fa fa-arrow-up"></i>
        </div>

        <div
            v-if="project.projectStatus === 0"
            class="spacer"></div>
        <div
            v-show="project.projectStatus < 5"
            @click="nextStatus()"
            class="document-tool document-tool--small"
            title="opdrachtstatus vooruit">
            <i class="fa fa-arrow-down"></i>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-status-tools {
        display: flex;
    }
</style>