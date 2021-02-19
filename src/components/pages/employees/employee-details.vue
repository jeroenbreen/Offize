<script>
    import Employee from '@/store/classes/Employee';
    import autoSaver from '@/components/elements/auto-saver';
    import closeMixin from '@/mixins/close';

    export default {
        name: 'employee-details',
        components: {
            autoSaver
        },
        mixins: [closeMixin],
        props: {
            employee: {
                type: Employee,
                required: true
            }
        },
        data() {
            return {
                clone: new Employee({...this.employee})
            }
        },
        computed: {},
        methods: {
            remove() {
                var message, callback;
                message = 'Wil je ' + this.clone.name + ' echt verwijderen?';
                callback = () => {
                    this.$store.dispatch('employees/delete', this.clone).then((response) => {
                        this.$store.commit('employees/unsetCurrent');
                        console.log('employee removed');
                    });
                };

                this.$store.commit('modal/confirm', {
                    message: message,
                    callback: callback
                });
            },
            close() {
                this.$store.commit('employees/unsetCurrent');
                localStorage.currentEmployee = null;
            }
        }
    }
</script>


<template>
    <div class="employee-details overlay">
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
                            <input v-model="clone.initials">
                            <div class="object-properties__label">
                                Initialen
                            </div>
                        </div>
                        <div class="object-properties__set">
                            <input v-model="clone.email">
                            <div class="object-properties__label">
                                Email
                            </div>
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="object-properties__set">
                            <textarea v-model="clone.mailFooter"></textarea>
                            <div class="object-properties__label">
                                Mail footer
                            </div>
                            <div class="html-rendered" v-html="clone.mailFooter"></div>
                        </div>

                    </div>

                    <div class="panel-section">
                        <div
                            @click="remove()"
                            class="document-tool__container">
                            <div
                                class="document-tool document-tool--warning"
                                title="Verwijder werknemer">
                                <i class="fa fa-trash"></i>
                            </div>
                            <span>Verwijder werknemer</span>
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
            :store-update="'employees/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .employee-details {


    }
</style>