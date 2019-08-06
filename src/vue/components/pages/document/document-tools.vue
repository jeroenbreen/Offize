<script>
    import Document from '@classes/Document';
    import $ from 'jquery';

    export default {
        name: 'document-tools',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.current;
            }
        },
        methods: {
            print() {
                let document, project, client, documentLines, employee;
                document = this.document.toPrint();
                project = this.$store.getters['projects/getItemById'](this.document.projectId);
                if (project) {
                    client = this.$store.getters['clients/getItemById'](project.clientId);
                }
                document.company = this.company.toBackend();
                document.client = client.toBackend();
                document.client.clientName = this.document.clientName;
                employee = this.$store.getters['employees/getItemById'](this.document.employeeId);
                document.employee = employee.name;
                documentLines = this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
                document.documentLines = [...documentLines];
                console.log(document);
                $.ajax({
                    type: 'POST',
                    url: 'print/print-adapter.php',
                    data: JSON.stringify({data: document}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function(response){
                        console.log(response);
                        window.open(window.config.printLocation + response);
                    }
                });
            },
            mail() {
                // var mail = {
                //     id: null,
                //     subject: document.getPrefix() + ' voor de werkzaamheden m.b.t. ' + document.title,
                //     content: 'Beste ' + document.contactName + ',\n\nBijgeleverd de ' + document.getPrefix().toLowerCase() + ' voor de werkzaamheden  m.b.t. ' + document.title + '.\n\n',
                //     member_id: document.member.memberId,
                //     sender: document.member.email,
                //     receiver: document.contact.email,
                //     date: dateTool.toBackendString(new Date()),
                //     mailType: 'invoice'
                // };
                //
                // status.mailPopup.active = true;
                // status.mailPopup.mail = new Mail(mail);
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
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-tools {
        width: 170px;
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