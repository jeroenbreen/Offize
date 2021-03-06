<script>
    import Document from '@/store/classes/Document';
    import Mail from '@/store/classes/Mail';
    import mails from '@/components/pages/mails/mails';
    import dateTool from '@/tools/date-tool';
    import documentPrint from "./tools/document-print";

    export default {
        name: 'document-tools',
        components: {
            documentPrint,
            mails
        },
        props: {
            document: {
                type: Document,
                required: true
            },
            international: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.all[0];
            },
            project() {
                return this.$store.getters['projects/getItemById'](this.document.projectId);
            },
            client() {
                 return this.$store.getters['clients/getItemById'](this.project.clientId);
            },
            employee() {
                return this.$store.getters['employees/getItemById'](this.document.employeeId);
            }
        },
        methods: {
            mail() {
                var mail;
                mail = {
                    id: null,
                    subject: this.document.getPrefix() + ' voor de werkzaamheden m.b.t. ' + this.document.title,
                    content: 'Beste ' + this.document.clientName + ',\n\nBijgeleverd de ' + this.document.getPrefix().toLowerCase() + ' voor de werkzaamheden  m.b.t. ' + this.document.title + '.\n\n',
                    employeeId: this.document.employeeId,
                    receiver: this.client.email,
                    documentId: this.document.id,
                    date: dateTool.toBackendString(new Date()),
                    mailType: 'invoice'
                };
                this.$store.commit('mails/setCurrent', new Mail(mail));
            },
            lock () {
                this.document.locked = !this.document.locked;
            },
            deleteDocument() {
                let name, message, callback;
                name = this.document.getPrefix() + ' ' + this.document.toSlug();
                message = 'Wil je ' + name + ' echt verwijderen?';

                callback = () => {
                    this.$store.dispatch('documents/delete', this.document).then((response) => {
                        this.$store.commit('documents/unsetCurrent');
                        localStorage.currentDocument = null;
                        console.log('document removed');
                    });
                };

                this.$store.commit('modal/confirm', {
                    message: message,
                    callback: callback
                });
            }
        }
    }
</script>


<template>
    <div class="document-tools">
        <div class="document-tools__main">
            <document-print
                :document="document"
                :international="international"/>
            <div
                v-if="company.usesMail"
                @click="mail()"
                class="document-tool">
                <i class="fa fa-paper-plane"></i>
            </div>

            <div
                @click="lock()"
                :class="{'document-tool--active': document.locked }"
                class="document-tool">
                <i class="fa fa-lock"></i>
            </div>

            <div
                    v-show="!document.locked"
                    @click="deleteDocument()"
                    class="document-tool document-tool--warning">
                <i class="fa fa-trash"></i>
            </div>
        </div>


        <div class="document-tools__extra">
            <div v-if="document.doctype === 'invoice'">
                <span>Betaald</span>
                <input
                        type="checkbox"
                        class=""
                        value="1"
                        v-model="document.paid">
            </div>

            <div>
                <span>Engels</span>
                <input
                    type="checkbox"
                    class=""
                    value="1"
                    v-model="document.english">
            </div>

            <div v-if="!document.locked">
                <span>
                    Verberg total
                </span>
                <input
                        type="checkbox"
                        v-model="document.hideTotal">
            </div>

            <div v-if="!document.locked">
                <span>
                    BTW
                </span>
                <input
                        type="text"
                        v-model="document.vat">
            </div>
        </div>

        <div class="mails__container">
            <mails
                :document="document"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document-tools {
        width: 400px;
        margin-left: 20px;

        .document-tools__main {
            display: flex;
            padding-top: 5px;
        }

        .document-tools__extra {
            margin-top: 20px;
            color: #fff;

            input {
                width: 30px;
            }

            span {
                width: 120px;
                display: inline-block;
            }
        }
    }
</style>