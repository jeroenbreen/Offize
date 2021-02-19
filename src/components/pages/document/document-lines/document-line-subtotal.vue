<script>
    import DocumentLine from '@/store/classes/DocumentLine';
    import Document from '@/store/classes/Document';

    export default {
        name: 'document-line-subtotal',
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
        computed: {
            documentLines() {
                return this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
            }
        },
        methods: {

            getSubTotal(multiplier) {
                let total, i;
                total = 0;
                i = this.getIndex() - 1;
                while (i > -1 && this.documentLines[i].lineType !== 'subtotal') {
                    let documentLine = this.documentLines[i];
                    if (documentLine.lineType === 'count') {
                        total += documentLine.rate * documentLine.hours;
                    } else if (documentLine.lineType === 'amount') {
                        total += Number(documentLine.amount);
                    }
                    i--;
                }
                total *= multiplier;
                total = Math.round(100 * total) / 100;
                return total;
            },
            getIndex() {
                // since this.documentLine is a clone, we cannot do indexOf()
                for (let i = 0, l = this.documentLines.length; i < l; i++) {
                    let documentLine = this.documentLines[i];
                    if (documentLine.id === this.documentLine.id) {
                        return i;
                    }
                }
                return -1;
            }
        }
    }
</script>


<template>
    <div class="document-line-count">
        <div class="subtotal subtotal-1">
            <div class="lines-row-c1">
                <b>Subtotaal</b>
            </div>
            <div class="lines-row-c2">
                &nbsp;
            </div>
            <div class="lines-row-c3">
                &nbsp;
            </div>
            <div class="lines-row-c4 subtotal-total">
                <b>{{getSubTotal(1)}} {{document.currency}}</b>
            </div>
        </div>

        <div class="subtotal subtotal-2">
            <div class="lines-row-c1">
                BTW {{document.vat}}%
            </div>
            <div class="lines-row-c2">
                &nbsp;
            </div>
            <div class="lines-row-c3">
                &nbsp;
            </div>
            <div class="lines-row-c4">
                {{getSubTotal((document.vat / 100))}} {{document.currency}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document-line-count {
        width: 100%;

        .subtotal {
            display: flex;
            justify-content: space-between;
        }

        .subtotal-1 {
            height: 24px;
            display: flex;

            div {
                padding-top: 5px;
            }

            .subtotal-total {
                border-top: 1px solid #000;
            }
        }



    }
</style>