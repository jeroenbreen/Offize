<script>
    import $ from 'jquery';
    import navigation from '@components/elements/navigation';
    import settings from '@components/pages/settings/settings';
    import pages from '@data/pages';
    import statusses from '@data/statusses';
    import documentPopup from '@components/pages/document/document-popup';
    import modal from '@components/elements/modal';

    export default {
        name: 'app',
        components: {
            navigation, settings, documentPopup, modal
        },
        computed: {
            isBootstrapped() {
                return this.$store.state.settings.bootstrapped;
            },
            showModal() {
                return this.$store.state.modal.show;
            },
            showSettings() {
                return this.$store.state.settings.showSettings;
            },
            currentDocument() {
                return this.$store.state.documents.current;
            }
        },
        methods: {
            bootstrap(data) {
                this.$store.commit('pages/init', pages);
                this.$store.commit('statusses/init', statusses);
                this.$store.commit('clients/init', data.clients);
                this.$store.commit('projects/init', data.projects);
                this.$store.commit('employees/init', data.employees);
                this.$store.commit('documents/init', data.documents);
                this.$store.commit('documentLines/init', data.lines);
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

                if (localStorage.currentEmployee) {
                    let employee = this.$store.getters['employees/getItemById'](Number(localStorage.currentEmployee));
                    if (employee) {
                        this.$store.commit('employees/setCurrent', employee);
                    }
                }

                if (localStorage.currentDocument) {
                    let document = this.$store.getters['documents/getItemById'](Number(localStorage.currentDocument));
                    if (document) {
                        this.$store.commit('documents/setCurrent', document);
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
            <settings
                v-if="isBootstrapped && showSettings"/>
        </div>

        <document-popup
            v-if="isBootstrapped && currentDocument"
            :document="currentDocument"/>

        <modal v-if="showModal"></modal>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
</style>