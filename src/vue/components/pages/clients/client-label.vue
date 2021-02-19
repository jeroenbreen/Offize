<script>
    import Client from '@classes/Client';

    export default {
        name: 'client-label',
        components: {},
        props: {
            client: {
                type: Client,
                required: true
            }
        },
        computed: {
            isCurrent() {
                return this.$store.state.clients.current && this.client.id === this.$store.state.clients.current.id;
            }
        },
        methods: {
            setCurrent() {
                this.$store.commit('clients/setCurrent', this.client);
                localStorage.currentClient = this.client.id;
            }
        }
    }
</script>


<template>
    <div
        @click="setCurrent()"
        :class="{'page-standard-item--current': isCurrent}"
        class="client-label page-standard-item">
        {{client.toSlug()}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-label {

    }
</style>