<script>
    import Document from '@classes/Document'
    import autoSaver from '@components/elements/auto-saver';
    import document from './document';
    import documentTools from './document-tools';

    export default {
        name: 'document-popup',
        components: {
            document, documentTools, autoSaver
        },
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
        computed: {},
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
                        :document="clone"/>

                    <document-tools
                        :document="clone"/>
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

        .document__container {
            display: flex;
        }
    }
</style>