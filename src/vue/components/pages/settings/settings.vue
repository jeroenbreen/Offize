<script>
    import Company from '@classes/Company';
    import autoSaver from '@components/elements/auto-saver';

    export default {
        name: 'settings',
        props: {},
        components: {
            autoSaver
        },
        data() {
            return {
                clone: new Company(this.$store.state.company.current.toBackend())
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
    <div class="client-details overlay">
        <div class="popup__container">
            <div class="popup">
                <div class="panel">
                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.name">
                            <div class="object-properties__label">
                                Name
                            </div>
                        </div>
                    </div>
                    <div class="panel-section">
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.address">
                            <div class="object-properties__label">
                                Address
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.zipcode">
                            <div class="object-properties__label">
                                Postcode
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input title="Contact"
                                   v-model="clone.city">
                            <div class="object-properties__label">
                                City
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
    @import '@styles/variables.scss';

    .settings {

    }
</style>