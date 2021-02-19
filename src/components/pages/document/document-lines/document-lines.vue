<script>
    import sortableList from "@/components/elements/sortable-list";
    import Document from '@/store/classes/Document';
    import documentLine from './document-line';
    import documentLineTools from './document-line-tools';

    export default {
        name: 'document-lines',
        components: {
            sortableList, documentLine, documentLineTools
        },
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
            }
        },
        data() {
            return {
                list: []
            }
        },
        computed: {
            documentLines() {
                return this.$store.getters['documentLines/getLinesForDocument'](this.document.id);
            },
            documentLinesLength() {
                return this.documentLines.length;
            }
        },
        methods: {
            getSize(size) {
                return size * this.scale + 'px';
            },
            onSortStart(event) {

            },
            onSortEnd(event) {
                setTimeout(()=> {
                    this.update();
                    //console.log(this.list.map((p) => p.text));
                })
            },
            update() {
                let index, changes;
                changes = [];
                index = 0;
                // to be sure to not push changes while running this loop,
                // we do it in two steps
                for (let documentLine of this.list) {
                    changes.push({
                        documentLine: documentLine,
                        arrayOrder: index
                    });
                    index++;
                }

                for (let change of changes) {
                    let clone = change.documentLine.toBackend();
                    clone.arrayOrder = change.arrayOrder;
                    this.$store.dispatch('documentLines/update', clone).then(() => {
                        console.log('documentLine updated');
                    });
                }
            }
        },
        mounted() {
            this.list = [...this.documentLines];
        },
        watch: {
            documentLinesLength: {
                handler: function() {
                    this.list = [...this.documentLines];
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div
        :style="{
            'top': getSize(template.lines.top),
            'padding': getSize(template.lines.padding)
        }"
        class="document__lines">

        <sortable-list
                lockAxis="y"
                :useDragHandle="true"
                v-model="list"
                @sortStart="onSortStart($event)"
                @sortEnd="onSortEnd($event)">

            <document-line
                v-for="(documentLine, index) in list"
                :index="index"
                :key="index"
                :document-line="documentLine"
                :document="document"/>
        </sortable-list>


        <document-line-tools
            v-if="!document.locked"
            :document="document"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

</style>