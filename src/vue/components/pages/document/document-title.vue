<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-title',
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
        computed: {},
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
                'top': getSize(template.title.top),
                'height': getSize(template.title.height),
                'padding': getSize(template.title.padding)
            }"
        class="document__title">
        <b>Betreft:</b>&nbsp;
        <input
                v-if="!document.locked"
                v-model="document.title">
        <div v-if="document.locked">
            {{document.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-title {

    }
</style>