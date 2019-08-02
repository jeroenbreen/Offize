<script>
    export default {
        name: 'client-search',
        components: {},
        props: {},
        data() {
            return {
                search: this.$store.state.clients.search
            }
        },
        computed: {},
        methods: {
            updateSearch() {
                this.$store.commit('clients/updateProperty', {key: 'search', value: this.search})
            }
        }
    }
</script>


<template>
    <div class="client-search">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Search for clients..."
                v-model="search"
                @keyup="updateSearch()"
                class="input--full">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-search {

    }
</style>