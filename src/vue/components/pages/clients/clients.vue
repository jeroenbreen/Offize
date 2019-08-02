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
                return this.$store.getters['clients/getClients'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="clients">
        <div class="client__tools">
            <client-create/>
            <client-search/>
            <div class="clients__search-results">
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
    @import '@styles/variables.scss';

    .clients {
        display: flex;
        height: 100%;

        .client__tools {
            width: 50%;
            max-width: 500px;
            padding-right: 20px;
            height: 100%;

            .client-create {
                height: 120px;
            }

            .client-search {
                height: 70px;
            }

            .clients__search-results {
                height: calc(100% - 190px);
                overflow: auto;
            }
        }
    }
</style>