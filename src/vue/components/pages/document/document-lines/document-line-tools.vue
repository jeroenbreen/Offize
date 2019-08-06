<script>
    import DocumentLine from '@classes/DocumentLine';
    import Document from '@classes/Document';

    export default {
        name: 'document-line-tools',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        computed: {},
        methods: {
            createDocumentLine(lineType) {
                let documentLine, existingLines;
                documentLine = new DocumentLine();
                existingLines = this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
                documentLine.lineType = lineType;
                documentLine.documentId = this.document.id;
                documentLine.arrayOrder = existingLines.length;
                documentLine.rate = this.document.rate;

                this.$store.dispatch('documentLines/create', documentLine).then((response) => {
                    console.log('documentLine created');
                });
            }
        }
    }
</script>


<template>
    <div class="document-line-tools">
        <div
            @click="createDocumentLine('count')"
            class="document-tool"
            title="rekenmodel toevoegen">
            <i class="fa fa-ellipsis-h"></i>
        </div>

        <div
            @click="createDocumentLine('amount')"
            class="document-tool"
            title="vast bedrag toevoegen">
            <i class="fa fa-euro-sign"></i>
        </div>

        <div
            @click="createDocumentLine('subtotal')"
            class="document-tool"
            title="subtotal">
            <i class="fa fa-calculator"></i>
        </div>

        <div
            @click="createDocumentLine('text')"
            class="document-tool"
            title="beschrijving toevoegen">
            <i class="fa fa-align-left"></i>
        </div>

        <div
            @click="createDocumentLine('enter')"
            class="document-tool"
            title="enter toevoegen">
            <i class="fa fa-paragraph"></i>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-line-tools {
        display: flex;
    }
</style>