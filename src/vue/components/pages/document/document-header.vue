<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-header',
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
    <div class="document__header">
        <img
        :style="{ 'height': getSize(template.logo.height)}"
        :src="company.logoUrl">
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>