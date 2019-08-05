<script>
    export default {
        name: 'project-se',
        components: {},
        props: {},
        data() {
            return {
                search: this.$store.state.projects.search
            }
        },
        computed: {},
        methods: {
            updateSearch() {
                this.$store.commit('projects/updateProperty', {key: 'search', value: this.search})
            }
        }
    }
</script>


<template>
    <div class="project-se">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Search for projects..."
                v-model="search"
                @keyup="updateSearch()"
                class="input--full">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-se {

    }
</style>