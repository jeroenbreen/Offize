<script>
    import Document from '@classes/Document';

    export default {
        name: 'mini-document',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
        },
        computed: {},
        methods: {
            setCurrent() {
                this.$store.commit('documents/setCurrent', this.document);
                localStorage.currentDocument = this.document.id;
            }
        }
    }
</script>


<template>
    <div
        @click="setCurrent()"
        class="mini-document">
        <b>{{document.getPrefix()}} {{document.toSlug()}}</b><br>
        {{document.title}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .mini-document {
        background: #fff;
        width: 105px;
        height: 150px;
        padding: 12px 6px 10px 6px;
        margin: 0 8px 8px 0;
        display: inline-block;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 10px;
        transition: all 0.2s ease;
        border: 1px solid transparent;

        &:after {
            position: absolute;
            right: 8px;
            bottom: 8px;
            border-radius: 50%;
            background: red;
            content: '';
            z-index: 1;
            width: 12px;
            height: 12px;
        }

        &.paid {

            &:after {
                background: #fff;
            }
        }

        &.mini-doc--quotation {

            &:after {
                background: #fff;
            }
        }

        &:hover {
            border: 1px solid $active-color;
        }
    }
</style>