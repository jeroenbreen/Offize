<script>
    export default {
        name: 'client-search',
        components: {},
        props: {},
        data() {
            return {
                searchString: this.$store.state.clients.searchString
            }
        },
        computed: {},
        methods: {
            updateSearch() {
                this.$store.commit('clients/updateProperty', {key: 'searchString', value: this.searchString})
            }
        }
    }
</script>


<template>
    <div class="client-search page-search">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Search for clients..."
                v-model="searchString"
                @keyup="updateSearch()"
                class="input--full">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .client-search {

    }
</style>