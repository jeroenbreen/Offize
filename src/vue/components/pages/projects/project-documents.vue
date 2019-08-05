<script>
    import Project from '@classes/Project';
    import documentIcon from '@components/elements/document-icon';
    import Document from '@classes/Document';

    export default {
        name: 'project-documents',
        components: {
            documentIcon
        },
        props: {
            project: {
                type: Project,
                required: true
            },
            label: {
                type: Array,
                required: true
            },
            doctype: {
                type: String,
                required: true
            }
        },
        computed: {
            documents() {
                return this.$store.getters['documents/getDocumentsForProjectOfType']({projectId: this.project.id, doctype: this.doctype});
            }
        },
        methods: {
            create() {
                let document, data;
                document = new Document();
                document.projectId = this.project.id;
                document.employeeId = this.project.employeeId;
                document.doctype = this.doctype;
                document.title = this.project.projectName;
                document.clientId = this.project.clientId;
                data = document.toBackend();

                this.$store.dispatch('documents/create', data).then((response) => {
                    console.log('documents created');
                });
            }
        }
    }
</script>


<template>
    <div class="project-documents">
        <div class="panel">
            <div class="panel-section">
                <h2>
                    {{label[0]}}
                </h2>
            </div>
            <div class="panel-section">
                <div class="documents__container">
                    <document-icon
                            v-for="(document, index) in documents"
                            :key="index"
                            :document="document"/>
                </div>
            </div>
            <div class="panel-section">
                <div
                        @click="create()"
                        class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-plus"></i>
                    </div>
                    <span>{{label[1]}} toevoegen</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-documents {
        width: 400px;

        .documents__container {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>