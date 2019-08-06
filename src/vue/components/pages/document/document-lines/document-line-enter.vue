<script>
    import DocumentLine from '@classes/DocumentLine';
    import Document from '@classes/Document';

    export default {
        name: 'document-line-enter',
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
    <div class="document-line-count"></div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-line-count {

    }
</style>