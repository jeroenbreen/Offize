<script>
    import $ from 'jquery';
    import navigation from '@components/elements/navigation';

    export default {
        name: 'app',
        components: {
            navigation
        },
        methods: {
            bootstrap(data) {
                this.$store.commit('clients/init', data.contacts);
                this.$store.commit('projects/init', data.projects);
            }
        },
        mounted() {
            $.get('backend/bootstrap.php', (response) => {
                this.bootstrap(response);
            });
        }
    }
</script>


<template>
    <div class="app">
        <navigation/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/index.scss';
</style>