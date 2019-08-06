<script>
    export default {
        name: 'project-total',
        components: {},
        props: {
            status: {
                type: Object,
                required: true
            }
        },
        computed: {
            projects() {
                return this.$store.getters['projects/ordered'].filter((project) => {
                    return project.projectStatus === this.status.id;
                });
            },
            getTotal() {
                let total = 0;
                for (let project of this.projects) {
                    total += project.getBudget();
                }
                return total;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="project-total">
        <div class="project-total__status">
            {{status.title}}
        </div>
        <div class="project-total__amount">
            {{getTotal}} EUR
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-total {
        display: flex;
        justify-content: space-between;

        .project-total__amount {
            text-align: right;
        }
    }
</style>