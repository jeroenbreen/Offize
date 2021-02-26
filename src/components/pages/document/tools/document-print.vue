<script>
    import $ from "jquery";
    import Document from '@/store/classes/Document';

    export default {
        name: 'document-print',
        components: {},
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
            client() {
                return this.$store.getters['clients/getItemById'](this.project.clientId);
            },
            project() {
                return this.$store.getters['projects/getItemById'](this.document.projectId);
            }
        },
        methods: {
            print() {
                let document, documentLines, employee;
                document = this.document.toPrint();
                document.company = this.company.toBackend();
                document.client = this.client.toBackend();
                document.client.clientName = this.document.clientName ? this.document.clientName : '';
                document.international = this.international ? '1' : '0';
                employee = this.$store.getters['employees/getItemById'](this.document.employeeId);
                document.employee = employee.name;
                documentLines = this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
                document.documentLines = [...documentLines];
                $.ajax({
                    type: 'POST',
                    url: window.config.printLocation + 'print-adapter.php',
                    data: JSON.stringify({data: document}),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function(response){
                        window.open(window.config.printLocation + response);
                    }
                });
            }
        }
    }
</script>


<template>
    <div
            @click="print()"
            class="document-tool">
        <i class="fa fa-print"></i>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document-print {

    }
</style>