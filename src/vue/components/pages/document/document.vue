<script>
    import template from './template';
    import Document from '@classes/Document'
    import documentInfo from './document-info'
    import documentAddresses from './document-addresses'


    export default {
        name: 'document',
        components: {
            documentInfo, documentAddresses
        },
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        data() {
            return {
                template: template,
                scale: 0.5,
                clone: new Document(this.document.toBackend())
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
                // let total = 0;
                // for (let i = 0; i < this.document.lines.length; i++) {
                //     let line = this.document.lines[i];
                //     if (line.lineType === 'count') {
                //         total += line.rate * line.hours;
                //     } else if (line.lineType === 'amount') {
                //         total += parseFloat(line.amount);
                //     }
                // }
                // total *= multiplier;
                // total = Math.round(100 * total) / 100;
                // return total;
                return 0;
            }
        }
    }
</script>


<template>
    <div
        class="document"
        :style="{
            'width': getSize(template.paper.width),
            'height': getSize(template.paper.height),
            'padding': getSize(template.paper.padding),
            'font-size': getSize(template.paper.fontSize)
        }">

        <div class="paper__container">
            <div class="paper__header">
                <img
                    :style="{ 'height': getSize(template.logo.height)}"
                    :src="company.logoUrl">
            </div>

            <document-info
                :document="clone"
                :template="template"
                :scale="scale"/>

            <document-addresses
                :document="clone"
                :template="template"
                :scale="scale"/>

            <div
                :style="{
                    'top': getSize(template.title.top),
                    'height': getSize(template.title.height),
                    'padding': getSize(template.title.padding)
                }"
                class="document__title">
                <b>Betreft:</b>&nbsp;
                <input
                    v-if="!document.locked"
                    v-model="clone.title">
                <div v-if="document.locked">
                    {{clone.title}}
                </div>
            </div>

            <div
                :style="{
                    'top': getSize(template.lines.top),
                    'padding': getSize(template.lines.padding)
                }"
                class="document__lines">
                lines
            </div>

            <div
                v-if="!document.hideTotal"
                :style="{
                    'top': getSize(template.total.top),
                    'padding': getSize(template.total.padding)
                }"
                class="document__total" >
                <span class="left">
                    Totaal
                </span>
                <span class="right">
                        {{getTotal(1)}}
                        {{clone.currency}}
                    </span>
                <br>
                <div>
                    <span class="left">
                        BTW {{document.vat}}%
                    </span>
                    <span class="right">
                        {{getTotal((document.vat / 100))}}
                        {{document.currency}}
                    </span>
                    <span class="left lines-total-big">
                        <b>
                            Te betalen
                        </b>
                    </span>
                    <span class="right lines-total-big">
                        <b>
                            {{getTotal((1 + (document.vat / 100)))}}
                            {{document.currency}}
                        </b>
                    </span>
                </div>
            </div>

            <div
                :style="{
                    'top': getSize(template.footer.top)
                }"
                class="document__footer">
                <div
                    v-if="document.doctype === 'invoice'"
                    :style="{
                        'padding': getSize(template.footer.invoiceText.padding),
                        'font-size': getSize(template.footer.invoiceText.fontSize)
                    }"
                    class="document__invoice-text">
                    {{company.invoiceText}}
                </div>

                <img
                    :style="{
                        'width': getSize(template.footer.image.width),
                        'margin-top': getSize(template.footer.image.marginTop)
                    }"
                    :src="company.footerImageUrl">
            </div>

            <div
                :style="{
                    'top': getSize(template.legal.top),
                    'font-size': getSize(template.legal.fontSize)
                }"
                class="document__legal">
                {{company.name}} | KvK {{company.coc}} | BTW {{company.vat}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document {
        background: #fff;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
        border: 1px solid #888;
        margin-right: 10px;
        margin-bottom: 100px;
        position: relative;
        line-height: 15px;

        input {
            background: rgba(0, 0, 0, 0.03);
            font-size: 12px;
            padding: 3px;
            margin: -1px;
            border: 1px solid transparent;
        }

        .md-field {
            height: 26px;
            font-size: 12px!important;

            .md-select {
                background: rgba(0, 0, 0, 0.03);
                padding: 1px 4px;

                input {
                    font-size: 12px!important;
                    font-family: "Roboto condensed", serif!important;
                    color: #333!important;
                }

            }

            &:after {
                display: none;
            }
        }



        .paper__container {
            position: relative;

            .paper__header {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
            }

            .document__info {
                width: 50%;
                position: absolute;
                right: 0;
                top: 0;

                .document__id {
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-bottom: 2px;
                }

                .document__date {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }

                input {
                    text-align: right;

                    &.document-info__year {
                        width: 38px;
                    }

                    &.document-info__nr {
                        width: 30px;
                    }

                    &.document-info__day {
                        width: 30px;
                    }
                }
            }

            .document__addresses {
                width: 100%;
                position: absolute;
                left: 0;
                padding: 10px;
                border-top: 1px solid #bbb;
                display: flex;
                justify-content: space-between;

                input {
                    width: 100%;
                }

                .document__addresses--left{
                    width: calc(50% - 20px);
                }

                .document__addresses--right {
                    width: calc(50% - 20px);
                }
            }

            .document__title {
                width: 100%;
                position: absolute;
                left: 0;
                border-top: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                display: flex;
                align-items: center;

                input {
                    width: calc(100% - 40px);
                }
            }

            .document__lines {
                width: 100%;
                position: absolute;
                left: 0;

                ul {
                    padding: 0;
                    margin-left: -14px;
                    list-style: none;

                    li {
                        position: relative;
                        border-left: 2px solid transparent;
                        padding: 4px 0;

                        &.current-line {
                            border-left: 2px solid #000;
                        }
                    }
                }
            }

            .document__total {
                width: 100%;
                position: absolute;
                left: 0;

                span.left {
                    float: left;
                    width: 50%;
                }

                span.right {
                    float: right;
                    width: 50%;
                    text-align: right;
                }

                .lines-total-big {
                    font-size: 150%;
                    font-weight: 700;
                    margin-top: 5px;
                }
            }

            .document__footer {
                position: absolute;
                text-align: center;
                width: 100%;
                left: 0;

                .document__invoice-text {
                    border-top: 1px solid #bbb;
                    border-bottom: 1px solid #bbb;
                }

                img {
                    width: 100px;
                }
            }

            .document__legal {
                position: absolute;
                text-align: center;
                width: 100%;
                left: 0;
            }
        }
    }


    .ui-sortable-helper {
        box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
        z-index: 1000;
        background: #fff;

        input {
            border: 0;
        }

        .lines-cell {
            padding: 4px;
        }

        .remove-post {
            display: none;
        }
    }

    li.lines-row, .ui-sortable-helper {
        width: 100%;
        clear: both;
        position: relative;
        min-height: 24px;

        .handle {
            display: inline-block;
            float: left;
            margin: 4px 8px;
            cursor: move;
        }

        .lines-cell {
            display: inline-block;
            width: calc(100% - 30px);
            float: right;

            .lines-row-c1 {
                float: left;
                width: calc(52% - 30px);

                input {
                    width: 90%;
                }
            }

            .lines-row-c2 {
                float: left;
                width: 12%;

                input {
                    width: 78%;
                    text-align: right;
                }
            }

            .lines-row-c3 {
                float: left;
                width: 12%;

                input {
                    width: 90%;
                }
            }

            .lines-row-c4 {
                float: right;
                width: 24%;
                text-align: right;

                input {
                    width: 50%;
                    text-align: right;
                }
            }
        }

        .remove-post {
            position: absolute;
            right: -32px;
            top: -6px;
            margin-top: 0!important;
            background: transparent;
        }
    }
</style>