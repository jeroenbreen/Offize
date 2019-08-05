<script>
    import Client from '@classes/Client';
    import delayTool from '@tools/delay-tool';
    import autoSaver from '@components/elements/auto-saver';

    export default {
        name: 'client-details',
        components: {
            autoSaver
        },
        props: {
            client: {
                type: Client,
                required: true
            }
        },
        data() {
            return {
                clone: new Client({...this.client})
            }
        },
        computed: {},
        methods: {
            updateClone() {
                this.clone = new Client({...this.client});
            },
            remove() {
                var message, callback;
                message = 'Wil je ' + this.clone.name + ' echt verwijderen?';
                callback = () => {
                    this.$store.dispatch('clients/delete', this.clone).then((response) => {
                        this.$store.commit('clients/unsetCurrent');
                        console.log('client removed');
                    });
                };

                this.$store.commit('modal/confirm', {
                    message: message,
                    callback: callback
                });
            },
            close() {
                this.$store.commit('clients/unsetCurrent');
                localStorage.currentClient = null;
            }
        },
        watch: {
            client: function (val) {
                this.updateClone();
            }
        }
    }
</script>


<template>
    <div class="client-details overlay">
        <div class="popup__container">
            <div class="popup">
                <div class="panel">
                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input
                                v-model="clone.name"
                                class="client-details__name">
                            <div class="contact-detail__label">
                                Naam
                            </div>
                        </div>

                        <div
                                @click="copySlug()"
                                class="document-tool__container">
                            <div
                                    class="document-tool"
                                    title="kopieer slug">
                                <i class="fa fa-paperclip"></i>
                            </div>
                            <span>Kopier slug: {{clone.toSlug()}}</span>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Contact"
                                   v-model="clone.contactPerson">
                            <div class="contact-detail__label">
                                Contact
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Adres"
                                   v-model="clone.street">
                            <div class="contact-detail__label">
                                Adres
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Postcode"
                                   v-model="clone.zipcode">
                            <div class="contact-detail__label">
                                Postcode
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Plaats"
                                   v-model="clone.city">
                            <div class="contact-detail__label">
                                Plaats
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Telefoon"
                                   v-model="clone.telephone">
                            <div class="contact-detail__label">
                                Telefoon
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Email"
                                   v-model="clone.email">
                            <div class="contact-detail__label">
                                Email
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="www"
                                   v-model="clone.web">
                            <div class="contact-detail__label">
                                www
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Uurtarief" class="input-small"
                                   v-model="clone.rate">
                            <div class="contact-detail__label">
                                Uurtarief
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div
                                @click="remove()"
                                class="document-tool__container">
                            <div
                                    class="document-tool document-tool--warning"
                                    title="Verwijder relatie">
                                <i class="fa fa-trash"></i>
                            </div>
                            <span>Verwijder relatie</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                @click="close()"
                class="popup__close">
            </div>
        </div>

        <auto-saver
                :watch="clone"
                :store-get="'clients/getItemById'"
                :store-update="'clients/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-details {

        .client-details__name {
            margin-bottom: 6px;
        }

        .contact-detail__set {
            margin-bottom: 4px;

            input {
                padding: 6px;
                font-size: 13px;
                outline: none;
                width: 250px;

                &.input-small {
                    width: 60px;
                    margin-right: 190px;
                }
            }

            .contact-detail__label {
                display: inline-block;
                margin-left: 8px;
            }
        }
    }
</style>