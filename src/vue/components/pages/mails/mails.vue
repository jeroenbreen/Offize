<script>
    import Document from '@classes/Document';
    import mailLabel from './mail-label';

    export default {
        name: 'mails',
        components: {
            mailLabel
        },
        props: {
            document: {
                type: Document,
                required: true
            }
        },
        computed: {
            mails() {
                return this.$store.getters['mails/getMailsByDocumentId'](this.document.id);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="mails">
        <div
            v-if="mails.length > 0"
            class="mails__header">
            Mails verzonden mbt dit document:
        </div>
        <mail-label
            v-for="(mail, index) in mails"
            :key="index"
            :mail="mail"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .mails {
        margin-top: 40px;
        color: #fff;

        .mails__header {
            margin-bottom: 4px;
            font-weight: 700;
        }
    }
</style>