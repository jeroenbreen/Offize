<script>
    import Comment from '@classes/Comment';
    import dateTool from '@tools/date-tool';

    export default {
        name: 'comment',
        components: {},
        props: {
            comment: {
                type: Comment,
                required: true
            }
        },
        computed: {
            date() {
                console.log(this.comment.date);
                return dateTool.toString(this.comment.date);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="comment">
        <div class="comment__text">
            {{comment.comment}}
        </div>
        <div class="comment__date">
            {{date}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .comment {
        margin-bottom: 20px;
        position: relative;
        display: inline-block;
        margin-right: 6px;


        .comment__text {
            min-height: 29px;
            display: inline-block;
            background: $grey-soft;
            padding: 8px;
            border-radius: 15px;
            font-size: 10px;
            position: relative;
            min-width: 50px;

            &:after {
                content: '';
                position: absolute;
                left: 20px;
                bottom: -10px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 12px solid #eee;
            }
        }

        .comment__date {
            display: block;
            padding-left: 40px;
            font-size: 8px;
        }

        input {
            width: 200px;
            border: 1px dashed #aaa;
            background: transparent;
            padding: 2px;
            margin: 3px;
            height: 23px;
        }

        button {
            float: right;
            margin: 1px 4px 0 0;
        }
    }
</style>