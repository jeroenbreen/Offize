<script>
    import DocumentLine from '@/store/classes/DocumentLine';
    import Document from '@/store/classes/Document';

    export default {
        name: 'document-line-count',
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
            <input v-if="!document.locked" v-model="documentLine.hours">
            <span v-if="document.locked">{{documentLine.hours}}</span>
            ×
        </div>
        <div class="lines-row-c3">
            <input v-if="!document.locked" v-model="documentLine.rate">
            <span v-if="document.locked">{{documentLine.rate}}</span>
        </div>
        <div class="lines-row-c4">
            {{documentLine.hours * documentLine.rate}} {{document.currency}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document-line-count {

    }
</style>