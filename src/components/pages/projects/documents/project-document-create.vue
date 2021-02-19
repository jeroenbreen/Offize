<script>
    import Project from "@/store/classes/Project";
    import Document from "@/store/classes/Document";

    export default {
        name: 'project-document-create',
        components: {},
        props: {
            project: {
                type: Project,
                required: true
            },
            doctype: {
                type: String,
                required: true
            },
            label: {
                type: Array,
                required: true
            }
        },
        computed: {},
        methods: {
            create() {
                let document, client, data;
                document = new Document();
                document.projectId = this.project.id;
                document.employeeId = this.project.employeeId;
                document.doctype = this.doctype;
                document.title = this.project.projectName;
                document.clientId = this.project.clientId;
                document.year = new Date().getFullYear();
                document.nr = this.$store.getters['documents/getNr'](this.doctype);
                document.rate = this.project.rate;
                client = this.$store.getters['clients/getItemById'](this.project.clientId);
                document.clientName = client.contactPerson;
                document.english = client.english;
                data = document.toBackend();
                this.$store.dispatch('documents/create', data).then((response) => {
                    let doc = this.$store.getters['documents/getItemById'](Number(response.id));
                    this.$store.commit('documents/setCurrent', doc);
                });
            }
        }
    }
</script>


<template>
    <div class="project-document-create">
        <div
            @click="create()"
            class="document-tool__container">
            <div class="document-tool">
                <i class="fa fa-plus"></i>
            </div>
            <span>{{label[1]}} toevoegen</span>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .project-document-create {

    }
</style>