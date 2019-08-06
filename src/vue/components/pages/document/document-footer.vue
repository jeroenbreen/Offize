<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-footer',
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
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>