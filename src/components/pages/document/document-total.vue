<script>
    import Document from '@/store/classes/Document';
    import Client from '@/store/classes/Client';

    export default {
        name: 'document-total',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
            client: {
                type: Client,
                required: true
            },
            scale: {
                type: Number,
                required: true
            },
            template: {
                type: Object,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.all[0];
            },
            vatShifted() {
                return this.client.eu;
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
                total = Math.ceil(100 * total) / 100;
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
        class="document__total">

        <div
            :class="{'document__total-row--big': vatShifted }"
            class="document__total-row">
            <div class="document__total-left">
                <div v-if="document.english">
                    Total
                </div>
                <div v-else>
                    Totaal
                </div>
            </div>
            <div class="document__total-right">
                {{getTotal(1)}}
                {{document.currency}}
            </div>
        </div>

        <div
            v-if="vatShifted"
            class="document__total-row">
            <div class="document__total-left">
                <div v-if="document.english">
                    Vat shifted to {{client.vat}}
                </div>
                <div v-else>
                    BTW verlegd naar {{client.vat}}
                </div>
            </div>
            <div class="document__total-right"></div>
        </div>



        <div
            v-if="!vatShifted"
            class="document__total-row">
            <div class="document__total-left">
                <span v-if="document.english">
                    VAT&nbsp;
                </span>
                <span v-else>
                    BTW&nbsp;
                </span>
                 {{document.vat}}%
            </div>
            <div class="document__total-right">
                {{getTotal((document.vat / 100))}}
                {{document.currency}}
            </div>
        </div>

        <div
            v-if="!vatShifted"
            class="document__total-row document__total-row--big">
            <div class="document__total-left">
                <span v-if="document.english">
                    <b>Total Amount</b>&nbsp;&nbsp;
                </span>
                <span v-else>
                    <b>Te betalen</b>&nbsp;
                </span>
            </div>
            <div class="document__total-right">
                <b>
                    {{getTotal((1 + (document.vat / 100)))}}
                    {{document.currency}}
                </b>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document__total {
        width: 100%;
        position: absolute;
        left: 0;

        .document__total-row {
            display: flex;
            width: 100%;

            .document__total-left {
                width: 50%;
            }

            .document__total-right {
                width: 50%;
                text-align: right;
            }

            &.document__total-row--big {
                font-size: 150%;
                font-weight: 700;
                margin-top: 5px;
            }
        }
    }

</style>