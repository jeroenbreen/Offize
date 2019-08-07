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
            create() {
                if (this.client.name.length > 0) {
                    this.$store.dispatch('clients/create', this.client.toBackend()).then((response) => {
                        console.log('client created');
                        this.client = new Client();
                    });
                } else {
                    this.$store.commit('modal/message', {
                        message: 'Vul een naam in.'
                    });
                }

            }
        }
    }
</script>


<template>
    <div class="client-create">
        <div class="panel">
            <div class="panel-section">
                <input
                        type="text"
                        placeholder="Name"
                        v-model="client.name"
                        class="input--full">
            </div>


            <div class="panel-section">
                <div
                        @click="create()"
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