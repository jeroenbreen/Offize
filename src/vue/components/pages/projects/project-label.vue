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
        data() {
            return {
                clone: new Project(this.project.toBackend())
            }
        },
        computed: {
            clientName() {
                let client = this.$store.getters['clients/getItemById'](this.project.clientId);
                return client ? client.name : '';
            },
            currentProject() {
                return this.$store.state.projects.current === this.project;
            },
            budget() {
                return commonTools.currencyFormat(this.project.getBudget());
            }
        },
        methods: {
            prevStatus() {
                this.clone.projectStatus -= 1;
                this.update();
            },
            nextStatus() {
                this.clone.projectStatus += 1;
                this.update();
            },
            update() {
                this.$store.dispatch('projects/update', this.clone).then((response) => {
                    console.log('client update');
                })
            },
            setCurrent() {
                this.$store.commit('projects/setCurrent', this.project)
            }
        }
    }
</script>


<template>
    <div
        @click="setCurrent()"
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

        &:first-child {

            .project-label__properties {
                border-top: 1px solid rgba(0,0,0,0.2);
            }
        }

        .project-label__properties {
            height: 100%;
            width: calc(100% - 80px);
            display: flex;
            cursor: pointer;
            border-left: 4px solid transparent;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            border-bottom: 1px solid rgba(0,0,0,0.2);
            border-left: 1px solid rgba(0,0,0,0.2);

            div {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 8px;
                border-right: 1px solid rgba(0,0,0,0.2);
                white-space: nowrap;
                overflow: hidden;

                &:last-child {
                    //border-right: 0;
                }
            }

            .project-label__name {
                width: calc(50% - 50px);
                border-left: 4px solid transparent;
            }

            .project-label__client {
                width: calc(50% - 50px);
            }

            .project-label__budget {
                width: 100px;
            }
        }

        .project-label__tools {
            width: 80px;
            display: flex;
            align-items: center;
            padding: 8px;

            .spacer {
                width: 26px;
                display: inline-block;
            }
        }

        &.project-label--current {

            .project-label__properties {

                .project-label__name {
                    border-left: 4px solid #000;
                }

            }
        }

        &.project-label--finished {

        }
    }
</style>