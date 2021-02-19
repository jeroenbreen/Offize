<script>
    import Mail from '@/store/classes/Mail';
    import dateTool from '@/tools/date-tool';

    export default {
        name: 'mail-label',
        components: {},
        props: {
            mail: {
                type: Mail,
                required: true
            }
        },
        computed: {
            date() {
                return dateTool.toString(this.mail.date)
            }
        },
        methods: {
            setCurrent() {
                this.$store.commit('mails/setCurrent', this.mail);
            }
        }
    }
</script>


<template>
    <div
        @click="setCurrent()"
        class="mail-label">
        <div class="mail-label__date">
            {{date}}
        </div>

        <div class="mail-label__type">
            {{mail.mailType}}
        </div>

        <div class="mail-label__subject">
            {{mail.subject}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .mail-label {
        display: flex;
        align-items: center;
        padding: 4px 0;
        border-bottom: 1px solid #fff;
        cursor: pointer;

        .mail-label__date {
            width: 110px;
        }

        .mail-label__type {
            width: 110px;
        }

        .mail-label__subject {
            width: calc(100% - 220px);
            overflow: hidden;
            white-space: nowrap;
        }
    }
</style>