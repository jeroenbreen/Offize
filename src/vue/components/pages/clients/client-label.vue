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
                return this.$store.state.clients.current && this.id === this.$store.state.clients.current.id;
            }
        },
        methods: {
            setCurrent() {
                this.$store.commit('clients/setCurrent', this.client)
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
        margin-bottom: 4px;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;

        &.client-label--current,
        &:hover {
            background: $active-color;
        }
    }
</style>