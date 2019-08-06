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
        {{company.name}} | KvK {{company.coc}} | BTW {{company.vat}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>