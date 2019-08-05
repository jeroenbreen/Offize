<script>
    import identity from '@components/elements/identity';

    export default {
        name: 'navigation',
        components: {
            identity
        },
        data() {
            return {
                pages: ['Projects', 'Clients', 'Documents']
            }
        },
        props: {},
        computed: {},
        methods: {
            openSettings() {
                this.$store.commit('settings/updateProperty', {key: 'showSettings', value: true});
            },
            openMembers() {

            }
        }
    }
</script>


<template>
    <div class="navigation">
        <identity/>

        <ul>
            <li
                v-for="page in pages">
                <router-link
                    :to="page">
                    {{page}}
                </router-link>
            </li>
        </ul>


        <div
            @click="openSettings()"
            class="menu-tools open-settings">
            <i class="fas fa-cog"></i>
        </div>

        <div
            @click="openMembers()"
            class="menu-tools open-members">
            <i class="fas fa-user-friends"></i>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .navigation {
        display: flex;
        position: relative;
        align-items: center;

        ul {
            padding: 0;
            margin: 0;

            li {
                display: inline-block;
                list-style: none;
                margin: 0 8px;

                a {
                    padding: 4px 8px;
                    color: #000!important;
                    text-decoration: none;
                    border-bottom: 0.5px solid transparent;

                    &:hover,
                    &.router-link-active {
                        text-decoration: none;
                        border-bottom: 0.5px solid #000;
                    }
                }
            }
        }

        .menu-tools {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            cursor: pointer;
            font-size: 12px;
            width: 24px;
            height: 24px;
            border: 1px solid #888;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                color: #000;
                border: 1px solid #000;
            }
        }

        .open-settings {
            right: 10px;
        }

        .open-members {
            right: 38px;
        }
    }
</style>