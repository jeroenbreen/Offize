<script>
    import Document from '@/store/classes/Document';

    export default {
        name: 'document-mini',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
            tiny: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            late() {
                return this.document.late(this.$store.state.today, 28);
            },
            daysLate() {
                return this.document.daysLate(this.$store.state.today, 28);
            },
            paid() {
                return this.document.paid;
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
        :class="{
            'document-mini--late': late,
            'document-mini--tiny': tiny,
        }"
        class="document-mini">

        <div
            v-if="!tiny"
            class="document-mini__label">
            <div class="document-mini__id">
                {{document.getPrefix()}}
                {{document.toSlug()}}
            </div>
            <div class="document-mini__title">
                {{document.title}}
            </div>
        </div>


        <div
            v-if="!paid"
            class="document-mini__status">
            {{daysLate}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document-mini {
        background: #fff;
        width: 105px;
        height: 150px;
        padding: 12px 6px 10px 6px;
        margin: 0 8px 8px 0;
        cursor: pointer;
        position: relative;
        font-size: 10px;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.2);

        .document-mini__label {

            .document-mini__id {
                font-weight: 700;
            }
        }

        .document-mini__status {
            position: absolute;
            right: 8px;
            bottom: 8px;
            border-radius: 50%;
            z-index: 1;
            width: 16px;
            height: 16px;
            background: orange;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }


        &.mini-doc--quotation {

            .document-mini__status {
                display: none;
            }
        }

        &:hover {
            border: 1px solid $active-color;
        }

        &.document-mini--late {

            .document-mini__status {
                background: red;
                color: #fff;
                font-weight: 700;
            }
        }

        &.document-mini--tiny {
            width: 10px;
            height: 14px;
            background: #fff;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            margin: 0 10px 0 0;

            .document-mini__status {
                right: -8px;
                top: -3px;
            }
        }
    }
</style>