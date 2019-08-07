<script>
    import Document from '@classes/Document';
    import Mail from '@classes/Mail';
    import mails from '@components/pages/mails/mails';
    import dateTool from '@tools/date-tool';
    import $ from 'jquery';

    export default {
        name: 'document-tools',
        components: {
            mails
        },
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.current;
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
            print() {
                let document, documentLines, employee;
                document = this.document.toPrint();
                     document.company = this.company.toBackend();
                document.client = this.client.toBackend();
                document.client.clientName = this.document.clientName;
                employee = this.$store.getters['employees/getItemById'](this.document.employeeId);
                document.employee = employee.name;
                documentLines = this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
                document.documentLines = [...documentLines];
                $.ajax({
                    type: 'POST',
                    url: 'print/print-adapter.php',
                    data: JSON.stringify({data: document}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function(response){
                        window.open(window.config.printLocation + response);
                    }
                });
            },
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
            <div
                @click="print()"
                class="document-tool">
                <i class="fa fa-print"></i>
            </div>

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
    @import '@styles/variables.scss';

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