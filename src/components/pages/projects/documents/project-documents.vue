<script>
    import Project from '@/store/classes/Project';
    import documentIcon from '@/components/elements/document-icon';
    import projectDocumentCreate from "./project-document-create";
    import projectDocumentClone from "./project-document-clone";

    export default {
        name: 'project-documents',
        components: {
            projectDocumentClone,
            projectDocumentCreate,
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
            },
            lastDocument() {
                return this.documents[this.documents.length - 1];
            }
        },
        methods: {

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
                <project-document-create
                    :project="project"
                    :doctype="doctype"
                    :label="label"/>
                <project-document-clone
                    v-if="documents.length > 0"
                    :project="project"
                    :clone="lastDocument"
                    :doctype="doctype"
                    :label="label"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-documents {
        width: 400px;

        .documents__container {
            display: flex;
            flex-wrap: wrap;
        }

        .panel-section {

            .document-tool__container {
                margin-bottom: 8px;
            }
        }
    }
</style>