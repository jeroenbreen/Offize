<script>
    import clientSearch from './client-search';
    import clientDetails from './client-details';
    import clientCreate from './client-create';
    import clientLabel from './client-label';

    export default {
        name: 'clients',
        components: {
            clientSearch, clientCreate, clientDetails, clientLabel
        },
        props: {},
        computed: {
            currentClient() {
                return this.$store.state.clients.current;
            },
            clients() {
                return this.$store.getters['clients/getFiltered'](['name']);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="clients">
        <client-create/>

        <div class="page__list">
            <client-search/>

            <div class="page__search-results">
                <client-label
                    v-for="(client, index) in clients"
                    :key="index"
                    :client="client"/>
            </div>
        </div>

        <client-details
            v-if="currentClient"
            :client="currentClient"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .clients {
        display: flex;
        height: 100%;

        .client-create {
            width: 400px;
            margin-right: 20px;
        }
    }
</style>