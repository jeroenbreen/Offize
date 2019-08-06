<script>
    import projectTotal from './project-total';

    export default {
        name: 'project-totals',
        components: {
            projectTotal
        },
        props: {},
        computed: {
            statusses() {
                return [...this.$store.state.statusses.all, {id: -1, title: 'Totaal'}];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="project-totals">
        <project-total
            v-for="(status, index) in statusses"
            :key="index"
            :status="status"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-totals {

    }
</style>