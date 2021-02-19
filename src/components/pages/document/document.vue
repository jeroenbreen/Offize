<script>
    import template from './template';
    import Document from '@/store/classes/Document';
    import documentHeader from './document-header';
    import documentTitle from './document-title';
    import documentInfo from './document-info';
    import documentAddresses from './document-addresses';
    import documentTotal from './document-total';
    import documentFooter from './document-footer';
    import documentLegal from './document-legal';
    import DocumentLines from "./document-lines/document-lines";

    export default {
        name: 'document',
        components: {
            documentHeader, documentTitle, documentInfo, documentAddresses,
            DocumentLines, documentTotal, documentFooter, documentLegal
        },
        props: {
            document: {
                type: Document,
                required: true
            },
            international: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                template: template,
                scale: 0.5
            }
        },
        computed: {
            company() {
                return this.$store.state.company.all[0];
            },
            client() {
                let project, client;
                project = this.$store.getters['projects/getItemById'](this.document.projectId);
                if (project) {
                    client = this.$store.getters['clients/getItemById'](project.clientId);
                    if (client) {
                        return client;
                    }
                }
            }
        },
        methods: {
            getSize(size) {
                return size * this.scale + 'px';
            }
        },
        mounted() {
            this.$store.dispatch('documentLines/read', this.document.id).then((response) => {

            });
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

        <div class="document__container">
            <document-header
                :document="document"
                :template="template"
                :scale="scale"/>

            <document-info
                :document="document"
                :client="client"
                :template="template"
                :scale="scale"/>

            <document-addresses
                :document="document"
                :client="client"
                :template="template"
                :scale="scale"/>

            <document-title
                :document="document"
                :template="template"
                :scale="scale"/>

            <document-lines
                :document="document"
                :template="template"
                :scale="scale"/>

            <document-total
                v-if="!document.hideTotal"
                :document="document"
                :client="client"
                :template="template"
                :scale="scale"/>

            <document-footer
                :document="document"
                :template="template"
                :scale="scale"
                :client="client"/>

            <document-legal
                :document="document"
                :template="template"
                :scale="scale"
                :international="international"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

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



        .document__container {
            position: relative;

            .document__header {
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

                    div {
                        margin-left: 4px;
                    }
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
                padding: 10px;
                z-index: 10;

                ul {
                    padding: 0;
                    margin: 0;
                    list-style: none;

                    li {
                        position: relative;
                        border-left: 2px solid transparent;

                        &.current-line {
                            border-left: 2px solid #000;
                        }
                    }
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
        position: relative;
        min-height: 22px;
        display: flex;

        .handle {
            display: inline-block;
            cursor: move;
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
        }

        .lines-cell {
            display: flex;
            align-items: center;
            width: 100%;

            input {
                height: 24px;
            }

            .lines-row-c1 {
                width: calc(52% - 30px);

                input {
                    width: 90%;
                }
            }

            .lines-row-c2 {
                width: 12%;

                input {
                    width: 78%;
                    text-align: right;
                }
            }

            .lines-row-c3 {
                width: 12%;

                input {
                    width: 90%;
                }
            }

            .lines-row-c4 {
                width: 24%;
                text-align: right;
                margin-left: auto;

                input {
                    width: 50%;
                    text-align: right;
                }
            }
        }

        .document-tool {
            position: absolute;
            right: -32px;
            top: 50%;
            transform: translateY(-50%);
            margin-top: 0!important;
        }
    }
</style>