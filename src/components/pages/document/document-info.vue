<script>
    import Document from '@/store/classes/Document';

    export default {
        name: 'document-info',
        components: {},
        data() {
            return {
                monthsNl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
                monthsEn: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
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
        computed: {
            months() {
                return this.document.english ? this.monthsEn : this.monthsNl;
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
        :style="{'top': getSize(template.info.top)}"
        class="document__info">
        <div class="document__id">
            {{document.getPrefix()}}&nbsp;

            <div v-if="!document.locked">
                <input
                    v-model="document.year"
                    class="document-info__year"> -

                <input
                    v-model="document.nr"
                    class="document-info__nr">
            </div>

            <div v-if="document.locked">
                {{document.toSlug()}}
            </div>
        </div>

        <div class="document__date">
            <div class="document__date--dynamic" v-if="!document.locked">
                <input
                    v-model="document.day"
                    class="document-info__day">

                <md-field class="months">
                    <md-select
                            v-model="document.month">
                        <md-option
                                v-for="(month, index) in months"
                                :value="(index + 1)"
                                :key="index">{{month}}</md-option>
                    </md-select>
                </md-field>

                <input
                    v-model="document.year"
                    class="document-info__year">
            </div>

            <div v-if="document.locked">
                {{document.day}} {{months[document.month - 1]}} {{document.year}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document__date {

        .document__date--dynamic {
            display: flex;

            input, .months {
                margin-right: 4px;

                &:last-child {
                    margin-right: 0;
                }
            }

            .months {

                .md-select {

                    input {
                        width: 60px;
                    }
                }
            }
        }
    }


</style>