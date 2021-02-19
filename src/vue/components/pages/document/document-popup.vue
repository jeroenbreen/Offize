<script>
    import Document from '@classes/Document'
    import autoSaver from '@components/elements/auto-saver';
    import document from './document';
    import documentTools from './document-tools';
    import closeMixin from '@mixins/close';

    export default {
        name: 'document-popup',
        components: {
            document, documentTools, autoSaver
        },
        mixins: [closeMixin],
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        data() {
            return {
                clone: new Document(this.document.toBackend())
            }
        },
        computed: {
            international() {
                let project, client;
                project = this.$store.getters['projects/getItemById'](this.document.projectId);
                if (project) {
                    client = this.$store.getters['clients/getItemById'](project.clientId);
                    if (client) {
                        return client.language === 'en';
                    }
                }
            }
        },
        methods: {
            close() {
                this.$store.commit('documents/unsetCurrent');
                localStorage.currentDocument = null;
            }
        }
    }
</script>


<template>
    <div class="document-popup overlay">
        <div class="popup__container">
            <div class="popup">
                <div class="document__container">
                    <document
                        :document="clone"
                        :international="international"/>

                    <document-tools
                        :document="clone"
                        :international="international"/>
                </div>
            </div>
            <div
                @click="close()"
                class="popup__close">
            </div>

            <auto-saver
                :watch="clone"
                :store-update="'documents/update'"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-popup {

        .popup__container {
            width: 1100px;
        }

        .document__container {
            display: flex;
        }
    }
</style>