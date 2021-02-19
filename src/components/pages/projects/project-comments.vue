<script>
    import Project from '@/store/classes/Project';
    import Comment from '@/store/classes/Comment';
    import comment from './comment';

    export default {
        name: 'project-comments',
        components: {
            comment
        },
        data(){
            return {
                comment: new Comment()
            }
        },
        props: {
            project: {
                type: Project,
                required: true
            }
        },
        computed: {
            comments() {
                return this.$store.getters['comments/getCommentsByProjectId'](this.project.id);
            }
        },
        methods: {
            create() {
                if (this.comment.comment.length > 0) {
                    this.comment.projectId = this.project.id;
                    this.comment.date = new Date();
                    this.$store.dispatch('comments/create', this.comment.toBackend()).then((response) => {
                        console.log('comment created');
                        this.comment = new Comment();
                    });
                } else {
                    this.$store.commit('modal/message', {
                        message: 'Vul wat in'
                    });
                }
            }
        },
        mounted() {
            this.$store.dispatch('comments/read', this.project.id).then((response) => {

            });
        }
    }
</script>


<template>
    <div class="project-comments">
        <div class="panel">
            <div class="panel-section">
                <h2>
                    Comments
                </h2>
            </div>
            <div class="panel-section">
                <div class="comments__container">
                    <comment
                        v-for="(comment, index) in comments"
                        :key="index"
                        :comment="comment"/>
                </div>
            </div>
            <div class="panel-section">
                <input
                    type="text"
                    placeholder="..."
                    v-model="comment.comment"
                    class="input--full">
                <div
                        @click="create()"
                        class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-plus"></i>
                    </div>
                    <span>Comment toevoegen</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-comments {

        .comments__container {
            display: flex;
            flex-wrap: wrap;
        }

        input {
            margin-bottom: 8px;
        }
    }
</style>