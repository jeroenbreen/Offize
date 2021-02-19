<script>
    import DocumentLine from '@classes/DocumentLine';
    import Document from '@classes/Document';

    export default {
        name: 'document-line-text',
        components: {},
        props: {
            documentLine: {
                type: DocumentLine,
                required: true
            },
            document: {
                type: Document,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="document-line-count">
        <input
            v-if="!document.locked"
            v-model="documentLine.text"
            placeholder="Titel">

        <div v-if="document.locked">
            {{documentLine.text}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-line-count {

    }
</style>