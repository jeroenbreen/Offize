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
        :class="{'client-label--current': isCurrent}"
        class="client-label">
        {{client.toSlug()}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-label {
        padding: 8px;
        background: $grey-soft;
        cursor: pointer;
        display: flex;
        align-items: center;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        border: 1px solid rgba(0,0,0,0.2);
        border-bottom: 0;

        &:last-child {
            border-bottom: 1px solid rgba(0,0,0,0.2);
        }

        &.client-label--current,
        &:hover {
            background: $active-color;
        }
    }
</style>