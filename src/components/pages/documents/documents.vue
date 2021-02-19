<script>
    import documentSearch from './document-search';
    import documentMini from './document-mini';

    export default {
        name: 'documents',
        components: {
            documentSearch, documentMini
        },
        props: {},
        computed: {
            documents() {
                return this.$store.getters['documents/getFiltered'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="documents">
        <div class="page__list">
            <document-search/>

            <div class="page__search-results">
                <document-mini
                    v-for="(document, index) in documents"
                    :key="index"
                    :document="document"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .documents {
        display: flex;
        height: 100%;

        .page__search-results {
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
        }
    }
</style>