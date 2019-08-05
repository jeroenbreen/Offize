<script>
    import Client from '@classes/Client';
    import delayTool from '@tools/delay-tool';

    export default {
        name: 'client-details',
        components: {},
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
            update() {
                const callback = () => {
                    this.$store.dispatch('clients/update', this.clone).then((response) => {
                        console.log('client update');
                    })
                };
                delayTool.delay(callback);
            },
            remove() {
                var message = 'Wil je ' + this.clone.name + ' echt verwijderen?';

                //modal.confirm(message, (result) => {
                    //if (result) {
                        this.$store.dispatch('clients/delete', this.clone).then((response) => {
                            this.$store.commit('clients/unsetCurrent');
                            console.log('client removed');
                        });
                    //}
                //});
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
                                    @keyup="update()"
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
                                   v-model="clone.contactPerson"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Contact
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Adres"
                                   v-model="clone.street"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Adres
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Postcode"
                                   v-model="clone.zipcode"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Postcode
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Plaats"
                                   v-model="clone.city"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Plaats
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Telefoon"
                                   v-model="clone.telephone"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Telefoon
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="Email"
                                   v-model="clone.email"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                Email
                            </div>
                        </div>
                        <div class="contact-detail__set">
                            <input title="www"
                                   v-model="clone.web"
                                   @keyup="update()">
                            <div class="contact-detail__label">
                                www
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="contact-detail__set">
                            <input title="Uurtarief" class="input-small"
                                   v-model="clone.rate"
                                   @keyup="update()">
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