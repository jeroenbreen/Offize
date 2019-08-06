<script>
    import DocumentLine from '@classes/DocumentLine';
    import Document from '@classes/Document';

    export default {
        name: 'document-line-amount',
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
        <div class="lines-row-c1">
            <input v-if="!document.locked" placeholder="Post" v-model="documentLine.text">
            <span v-if="document.locked">{{documentLine.text}}</span>
        </div>
        <div class="lines-row-c2">
            &nbsp;
        </div>
        <div class="lines-row-c3">
            &nbsp;
        </div>
        <div class="lines-row-c4">
            <input v-if="!document.locked" v-model="documentLine.amount">
            <span v-if="document.locked">{{documentLine.amount}}</span>
            {{document.currency}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-line-count {

    }
</style>