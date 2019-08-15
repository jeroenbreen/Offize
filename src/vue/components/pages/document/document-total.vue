<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-total',
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
                return this.$store.state.company.current;
            }
        },
        methods: {
            getSize(size) {
                return size * this.scale + 'px';
            },
            getTotal(multiplier) {
                let total, documentLines;
                total = 0;
                documentLines = this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
                for (let documentLine of documentLines) {
                    if (documentLine.lineType === 'count') {
                        total += documentLine.rate * documentLine.hours;
                    } else if (documentLine.lineType === 'amount') {
                        total += Number(documentLine.amount);
                    }
                }
                total *= multiplier;
                total = Math.round(100 * total) / 100;
                return total;
            }
        }
    }
</script>


<template>
    <div
        :style="{
            'top': getSize(template.total.top),
            'padding': getSize(template.total.padding)
        }"
        class="document__total" >
        <span class="left">
            <span v-if="international">
                Total
            </span>
            <span v-else>
                Totaal
            </span>
        </span>
        <span class="right">
            {{getTotal(1)}}
            {{document.currency}}
        </span>
        <br>
        <div>
            <span class="left">
                <span v-if="international">
                    VAT&nbsp;
                </span>
                <span v-else>
                    BTW&nbsp;
                </span>
                 {{document.vat}}%
                </span>
            <span class="right">
                {{getTotal((document.vat / 100))}}
                {{document.currency}}
            </span>
            <span class="left lines-total-big">
                <span v-if="international">
                    <b>Total Amount</b>&nbsp;&nbsp;
                </span>
                <span v-else>
                    <b>Te betalen</b>&nbsp;
                </span>
            </span>
            <span class="right lines-total-big">
                <b>
                    {{getTotal((1 + (document.vat / 100)))}}
                    {{document.currency}}
                </b>
            </span>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>