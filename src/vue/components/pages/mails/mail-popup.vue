<script>
    import Mail from '@classes/Mail';

    export default {
        name: 'mail-popup',
        components: {},
        props: {
            mail: {
                type: Mail,
                required: true
            }
        },
        data() {
            return {
                clone: new Mail(this.mail.toBackend())
            }
        },
        computed: {
            isUnsent() {
                return this.clone.id === null;
            },
            employee() {
                return this.$store.getters['employees/getItemById'](this.clone.employeeId);
            },
            employees() {
                return this.$store.state.employees.all;
            },
            document() {
                console.log(this.$store.getters['documents/getItemById'](this.clone.documentId));
                return this.$store.getters['documents/getItemById'](this.clone.documentId);
            }
        },
        methods: {
            close() {
                this.$store.commit('mails/unsetCurrent');
            },
            formatContent(content) {
                return content.replace(/\n/g, "<br />");
            }
        }
    }
</script>


<template>
    <div class="mail-popup overlay">
        <div class="popup__container">
            <div class="popup">
                <div class="mail__container">
                    <div class="popup__content">
                        <div class="mail__addresses mail__section">
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Van
                                </div>
                                <div class="mail__row-content">
                                    <md-field
                                        v-if="isUnsent">
                                        <md-select
                                                v-model="clone.employeeId"
                                                placeholder="Employee">
                                            <md-option
                                                    v-for="(employee, index) in employees"
                                                    :value="employee.id"
                                                    :key="index">{{employee.name}}</md-option>
                                        </md-select>
                                    </md-field>

                                    <div v-if="!isUnsent">
                                        {{employee.email}}
                                    </div>
                                </div>
                            </div>
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Aan
                                </div>
                                <div class="mail__row-content">
                                    <input
                                            v-model="clone.receiver"
                                            v-if="isUnsent"
                                            type="text">
                                    <div v-if="!isUnsent">
                                        {{clone.receiver}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mail__subject mail__section">
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Onderwerp
                                </div>
                                <div class="mail__row-content">
                                    <input
                                            v-model="clone.subject"
                                            v-if="isUnsent"
                                            type="text">
                                    <div v-if="!isUnsent">
                                        {{clone.subject}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mail__content">
                                    <textarea
                                            v-if="isUnsent"
                                            v-model="clone.content"></textarea>

                            <div v-if="!isUnsent" v-html="formatContent(clone.content)"></div>

                            <div class="member__mail-footer" v-html="employee.mailFooter"></div>
                        </div>

                        <div class="mail__attachements">
                            <div class="attachement">
                                <div class="attachement__icon">
                                    <i class="fas fa-paperclip"></i>
                                </div>
                                <div class="attachement__title">
                                    {{document.getPDFname()}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mail__tools">
                        <select
                                v-if="isUnsent"
                                ng-options="type as type for (index, type) in types"
                                v-model="clone.mailType"></select>
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

    .mail-popup {

        .mail__container {
            display: flex;

            .popup__content {
                width: calc(100% - 200px);

                .mail__section {
                    border-bottom: 1px solid #ddd;
                    padding: 6px 0;

                    .mail__info-row {
                        display: flex;
                        align-items: center;
                        height: 32px;
                        margin-bottom: 6px;

                        .mail__label {
                            width: 100px;
                            color: #aaa;
                        }

                        .mail__row-content {
                            width: calc(100% - 100px);

                            input {
                                width: 100%;
                            }
                        }
                    }
                }

                .mail__content {
                    padding: 6px 0;

                    textarea {
                        width: calc(100% + 4px);
                        height: 150px;
                        margin-left: -4px;
                    }
                }

                .mail__attachements {
                    padding: 20px 0;
                    display: flex;

                    .attachement {
                        background: #eee;
                        padding: 10px;
                        display: flex;
                        align-items: center;

                        .attachement__icon {
                            margin-right: 8px;
                        }
                    }
                }
            }

            .mail__tools {
                width: 200px;
                padding-left: 20px;
            }
        }
    }
</style>