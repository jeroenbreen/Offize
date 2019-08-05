<script>
    import $ from 'jquery';
    import navigation from '@components/elements/navigation';
    import statusses from '@data/statusses';

    export default {
        name: 'app',
        components: {
            navigation
        },
        computed: {
            isBootstrapped() {
                return this.$store.state.settings.bootstrapped;
            }
        },
        methods: {
            bootstrap(data) {
                this.$store.commit('statusses/init', statusses);
                this.$store.commit('clients/init', data.contacts);
                this.$store.commit('projects/init', data.projects);
                this.$store.commit('employees/init', data.members);
                this.$store.commit('documents/init', data.documents);
                this.$store.commit('comments/init', data.comments);
                this.$store.commit('company/init', data.company);
                this.$store.commit('settings/updateProperty', {key: 'bootstrapped', value: true});
            },
            readCache() {
                if (!localStorage) {
                    localStorage = {};
                }

                if (localStorage.currentProject) {
                    let project = this.$store.getters['projects/getItemById'](Number(localStorage.currentProject));
                    if (project) {
                        this.$store.commit('projects/setCurrent', project);
                    }
                }

                if (localStorage.currentClient) {
                    let client = this.$store.getters['clients/getItemById'](Number(localStorage.currentClient));
                    if (client) {
                        this.$store.commit('clients/setCurrent', client);
                    }
                }
            }
        },
        mounted() {
            $.get('backend/bootstrap.php', (response) => {
                this.bootstrap(response);
                this.readCache();
            });
        }
    }
</script>


<template>
    <div class="app">
        <navigation/>
        <div
            v-if="isBootstrapped"
            class="content">
            <router-view/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
</style>