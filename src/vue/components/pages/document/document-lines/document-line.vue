<script>
    import {ElementMixin, HandleDirective} from "vue-slicksort";

    import DocumentLine from '@classes/DocumentLine';
    import Document from '@classes/Document';

    import documentLineCount from './document-line-count';
    import documentLineAmount from './document-line-amount';
    import documentLineText from './document-line-text';
    import documentLineEnter from './document-line-enter';
    import documentLineSubtotal from './document-line-subtotal';
    import autoSaver from '@components/elements/auto-saver';


    export default {
        name: 'document-line',
        components: {
            documentLineCount, documentLineAmount, documentLineText, documentLineEnter, documentLineSubtotal,
            autoSaver
        },
        mixins: [ElementMixin],
        directives: { handle: HandleDirective },
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
        data() {
            return {
                clone: new DocumentLine(this.documentLine.toBackend())
            }
        },
        computed: {},
        methods: {
            deleteDocumentLine() {
                var message, callback;
                message = 'Wil je deze regel echt verwijderen?';
                callback = () => {
                    this.$store.dispatch('documentLines/delete', this.documentLine).then((response) => {
                        console.log('documentLine removed');
                    });
                };

                this.$store.commit('modal/confirm', {
                    message: message,
                    callback: callback
                });
            }
        },
        watch: {
            documentLine: {
                handler: function() {
                    this.clone = new DocumentLine(this.documentLine.toBackend())
                },
                deep: false
            }
        }
    }
</script>


<template>
    <li class="lines-row">

        <div
            v-if="!document.locked"
            v-handle
            class="handle">
            <img src="assets/img/drag.png">
        </div>

        <document-line-count
                v-if="documentLine.lineType === 'count'"
                :document-line="clone"
                :document="document"
                class="lines-cell"/>

        <document-line-amount
                v-if="documentLine.lineType === 'amount'"
                :document-line="clone"
                :document="document"
                class="lines-cell"/>

        <document-line-text
                v-if="documentLine.lineType === 'text'"
                :document-line="clone"
                :document="document"
                class="lines-cell"/>

        <document-line-enter
                v-if="documentLine.lineType === 'enter'"
                :document-line="clone"
                :document="document"
                class="lines-cell"/>

        <document-line-subtotal
                v-if="documentLine.lineType === 'subtotal'"
                :document-line="clone"
                :document="document"/>

        <div
                v-show="!document.locked"
                @click="deleteDocumentLine()"
                class="document-tool document-tool--small document-tool--warning">
            <i class="fa fa-trash"></i>
        </div>

        <auto-saver
            :watch="clone"
            :store-update="'documentLines/update'"/>
    </li>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


</style>