<script>
    import Company from '@/store/classes/Company';
    import autoSaver from '@/components/elements/auto-saver';
    import closeMixin from '@/mixins/close';

    export default {
        name: 'settings',
        props: {},
        components: {
            autoSaver
        },
        mixins: [closeMixin],
        data() {
            return {
                clone: new Company(this.$store.state.company.all[0].toBackend())
            }
        },
        computed: {},
        methods: {
            close() {
                this.$store.commit('settings/updateProperty', {key: 'showSettings', value: false});
            }
        }
    }
</script>


<template>
    <div class="settings overlay">
        <div class="popup__container">
            <div class="popup">
                <div class="panel">
                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input v-model="clone.name">
                            <div class="object-properties__label">
                                Naam
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <md-checkbox v-model="clone.companySameAsEmployee"></md-checkbox>
                            <div class="object-properties__label">
                                Bedrijfsnaam is eigen naam (naam van werknemer wordt dan weggelaten op documenten)
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input v-model="clone.address">
                            <div class="object-properties__label">
                                Adres
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.addressExtra">
                            <div class="object-properties__label">
                                Adres extra
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.zipcode">
                            <div class="object-properties__label">
                                Postcode
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.city">
                            <div class="object-properties__label">
                                Plaatsnaam
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.country">
                            <div class="object-properties__label">
                                Land
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.coc">
                            <div class="object-properties__label">
                                KvK
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.vat">
                            <div class="object-properties__label">
                                BTW nr
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.bankName">
                            <div class="object-properties__label">
                                Naam bank
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.bankAddress">
                            <div class="object-properties__label">
                                Adres bank
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.iban">
                            <div class="object-properties__label">
                                IBAN
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.bic">
                            <div class="object-properties__label">
                                BIC
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <textarea v-model="clone.invoiceText"></textarea>
                            <div class="object-properties__label">
                                Tekst onder factuur
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <textarea v-model="clone.invoiceTextEnglish"></textarea>
                            <div class="object-properties__label">
                                Tekst onder engelse factuur
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.logoUrl">
                            <div class="object-properties__label">
                                URL logo
                            </div>
                            <img class="html-rendered-img" :src="clone.logoUrl">
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.footerImageUrl">
                            <div class="object-properties__label">
                                URL footer
                            </div>
                            <img class="html-rendered-img" :src="clone.footerImageUrl">
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input v-model="clone.standardRate">
                            <div class="object-properties__label">
                                Standaardtarief
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.startingYear">
                            <div class="object-properties__label">
                                Aanvangsjaar
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input v-model="clone.color1">
                            <div class="object-properties__label">
                                Kleur 1
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.color2">
                            <div class="object-properties__label">
                                Kleur 2
                            </div>
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
                :store-update="'company/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .settings {

    }
</style>