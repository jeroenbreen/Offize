<script>
    import Project from '@classes/Project';
    import commonTools from '@tools/common-tools';

    export default {
        name: 'project-label',
        components: {},
        props: {
            project: {
                type: Project,
                required: true
            }
        },
        computed: {
            clientName() {
                return '';
            },
            currentProject() {
                return this.$store.state.projects.current === this.project;
            },
            budget() {
                return commonTools.currencyFormat(this.project.getBudget());
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{
            'project-label--current': currentProject,
            'project-label--finished': project.finished}"
    class="project-label">

        <div
            :class="'status-' + project.projectStatus"
            class="project-label__properties">
            <div class="project-label__name">
                {{project.toSlug()}}
            </div>

            <div class="project-label__client">
                {{clientName}}
            </div>

            <div class="project-label__budget">
                {{budget}}
                {{project.currency}}
            </div>
        </div>



        <div class="project-label__tools">
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

            <div
                v-if="project.projectStatus === 5"
                class="spacer"></div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-label {
        display: flex;
        height: 60px;

        .project-label__properties {
            height: 100%;
            width: calc(100% - 80px);
            display: flex;
            cursor: pointer;
            border-left: 4px solid transparent;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.2);

            div {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 8px;
            }
        }

        .project-label__tools {
            width: 80px;
            display: flex;
            align-items: center;
            padding: 8px;
        }

        &.project-label--current {

            .project-label__properties {
                border-left: 4px solid #000;
            }
        }

        &.project-label--finished {

        }
    }
</style>