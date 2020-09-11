<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-legal',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
            scale: {
                type: Number,
                required: true
            },
            template: {
                type: Object,
                required: true
            },
            international: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.all[0];
            }
        },
        methods: {
            getSize(size) {
                return size * this.scale + 'px';
            }
        }
    }
</script>


<template>
    <div
        :style="{
            'top': getSize(template.legal.top),
            'font-size': getSize(template.legal.fontSize)
            }"
        class="document__legal">
            <div>
                <b>{{company.name}}</b> |
                <span v-if="document.english">CoC:</span><span v-else>KvK:</span> {{company.coc}} |
                <span v-if="document.english">VAT:</span><span v-else>BTW:</span> {{company.vat}}
            </div>
            <div>
                Bank: {{company.bankName}} {{company.bankAddress}} |
                IBAN: {{company.iban}} |
                BIC: {{company.bic}}
            </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>