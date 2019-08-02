<script>
    import Client from '@classes/Client';

    export default {
        name: 'client-create',
        components: {},
        props: {},
        data() {
            return {
                client: new Client()
            }
        },
        computed: {},
        methods: {
            createClient() {
                this.$store.dispatch('clients/create', {...this.client}).then((response) => {
                    console.log('client created');
                });
            }
        }
    }
</script>


<template>
    <div class="client-create">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Name"
                v-model="client.name"
                class="input--full">

            <div class="panel__tools">
                <div
                        @click="createClient()"
                        class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-plus"></i>
                    </div>
                    <span>Add a client</span>
                </div>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-create {

    }
</style>