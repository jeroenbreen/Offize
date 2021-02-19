<script>
    import Project from "@/store/classes/Project";
    import Document from "@/store/classes/Document";
    import DocumentLine from "@/store/classes/DocumentLine";

    export default {
        name: 'project-document-clone',
        components: {},
        props: {
            project: {
                type: Project,
                required: true
            },
            clone: {
                type: Document,
                required: true
            },
            doctype: {
                type: String,
                required: true
            },
            label: {
                type: Array,
                required: true
            }
        },
        computed: {},
        methods: {
            create() {
                let document, data, clonedDocumentLines;
                document = new Document();

                // cloned data
                document.projectId = this.clone.projectId;
                document.employeeId = this.clone.employeeId;
                document.doctype = this.clone.doctype;
                document.title = this.clone.title + ' copy';
                document.clientId = this.clone.clientId;
                document.rate = this.clone.rate;
                document.clientName = this.clone.clientName;
                document.english = this.clone.english;

                // fresh data
                document.year = new Date().getFullYear();
                document.nr = this.$store.getters['documents/getNr'](this.doctype);


                data = document.toBackend();
                // do this before adding the new document, otherwise the new document
                // is last of the set
                this.$store.dispatch('documentLines/read', this.clone.id).then((response) => {
                    clonedDocumentLines = response;
                    this.$store.dispatch('documents/create', data).then((response) => {
                        let newDocument, newDocument_id;
                        newDocument_id = Number(response.id);
                        newDocument = this.$store.getters['documents/getItemById'](newDocument_id);
                        this.createDocumentLines(clonedDocumentLines, newDocument_id);
                        this.$store.commit('documents/setCurrent', newDocument);
                    });
                });
            },
            createDocumentLines(documentLines, document_id) {
                for (let documentLine of documentLines) {
                    this.createDocumentLine(documentLine, document_id);
                }
            },
            createDocumentLine(clone, document_id) {
                let documentLine;
                documentLine = new DocumentLine();
                documentLine.documentId = document_id;
                documentLine.lineType = clone.lineType;
                documentLine.text = clone.text;
                documentLine.hours = clone.hours;
                documentLine.amount = clone.amount;
                documentLine.arrayOrder = clone.arrayOrder;
                documentLine.rate = clone.rate;
                this.$store.dispatch('documentLines/create', documentLine);
            }
        }
    }
</script>


<template>
    <div class="project-document-clone">
        <div
            @click="create()"
            class="document-tool__container">
            <div class="document-tool">
                <i class="far fa-clone"></i>
            </div>
            <span>Laatste {{label[1].toLowerCase()}} clonen</span>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-document-clone {

    }
</style>