<script>
    import Client from '@classes/Client';
    import autoSaver from '@components/elements/auto-saver';
    import closeMixin from '@mixins/close';
    import commonTools from '@tools/common-tools';

    export default {
        name: 'client-details',
        components: {
            autoSaver
        },
        mixins: [closeMixin],
        props: {
            client: {
                type: Client,
                required: true
            }
        },
        data() {
            return {
                clone: new Client(this.client.toBackend())
            }
        },
        computed: {
            languages() {
                return [
                    {
                        id: 1,
                        title: 'Nederlands',
                        isoCode: 'nl'
                    }, {
                        id: 2,
                        title: 'Engels',
                        isoCode: 'en'
                    }
                ]
            }
        },
        methods: {
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
            },
            copySlug() {
                commonTools.clipboard(this.client.toSlug());
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
                        <div class="object-properties__set">
                            <input
                                v-model="clone.name"
                                class="client-details__name">
                            <div class="object-properties__label">
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
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.contactPerson">
                            <div class="object-properties__label">
                                Contact
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Adres"
                                   v-model="clone.street">
                            <div class="object-properties__label">
                                Adres
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Postcode"
                                   v-model="clone.zipcode">
                            <div class="object-properties__label">
                                Postcode
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Plaats"
                                   v-model="clone.city">
                            <div class="object-properties__label">
                                Plaats
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <md-checkbox v-model="clone.international"></md-checkbox>
                            <div class="object-properties__label">
                                Internationale klant
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <md-checkbox v-model="clone.eu"></md-checkbox>
                            <div class="object-properties__label">
                                Binnen de EU
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <md-field>
                                <md-select
                                        v-model="clone.language"
                                        placeholder="Language">
                                    <md-option
                                            v-for="(language, index) in languages"
                                            :value="language.isoCode"
                                            :key="language.isoCode">{{language.title}}</md-option>
                                </md-select>
                            </md-field>
                            <div class="object-properties__label">
                                Taal
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Telefoon"
                                   v-model="clone.vat">
                            <div class="object-properties__label">
                                BTW nummer
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Telefoon"
                                   v-model="clone.telephone">
                            <div class="object-properties__label">
                                Telefoon
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Email"
                                   v-model="clone.email">
                            <div class="object-properties__label">
                                Email
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="www"
                                   v-model="clone.web">
                            <div class="object-properties__label">
                                www
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Uurtarief" class="input-small"
                                   v-model="clone.rate">
                            <div class="object-properties__label">
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
                :store-update="'clients/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-details {

        .client-details__name {
            margin-bottom: 6px;
        }
    }
</style>