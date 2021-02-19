<script>
    export default {
        name: 'employee-search',
        components: {},
        props: {},
        data() {
            return {
                searchString: this.$store.state.employees.searchString
            }
        },
        computed: {},
        methods: {
            updateSearch() {
                this.$store.commit('employees/updateProperty', {key: 'searchString', value: this.searchString})
            }
        }
    }
</script>


<template>
    <div class="employee-search page-search">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Search for employees..."
                v-model="searchString"
                @keyup="updateSearch()"
                class="input--full">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .employee-search {

    }
</style>