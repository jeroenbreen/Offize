<script>
    import Document from '@classes/Document';

    export default {
        name: 'document-icon',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        computed: {
            isUnpaid() {
                return this.document.doctype === 'invoice' && !this.document.paid;
            }
        },
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
        :class="{'document-icon--unpaid': isUnpaid}"
        class="document-icon">
        <div class="document-icon__icon">
            <i class="fa fa-folder-open"></i>
        </div>
        <div class="document-icon__label">
            {{document.toSlug()}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-icon {
        color: #000;
        display: flex;
        align-items: center;
        margin: 0 12px 4px 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        height: 30px;
        text-decoration: none;
        font-size: 11px;
        cursor: pointer;
        border: 1px solid transparent;
        background: $grey-soft;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.2);

        &.document-icon--unpaid {
            background: $warning-color;

            .document-icon__icon {
                color: #fff;
            }
        }

        .document-icon__icon {
            font-size: 14px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            height: 100%;
        }

        .document-icon__label {
            padding: 0 6px;
            height: 100%;
            background: #fff;
            display: flex;
            align-items: center;
        }

        &:hover,
        .selected {
            background: $active-color;
        }

        &.not-paid {
            background: #f00!important;
            color: #fff;

            &:hover,
            .selected {
                border: 1px solid #000;
            }
        }
    }
</style>