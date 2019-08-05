<script>
    import Client from '@classes/Client';
    import Project from '@classes/Project';
    import Company from '@classes/Company';

    let saveBuffer = null;

    export default {
        name: 'auto-saver',
        props: {
            watch: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.constructor === Client || value.constructor === Project || value.constructor === Company;
                }
            },
            storeUpdate: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                localState: {
                    showSnackbar: false
                }
            }
        },
        watch: {
            watch: {
                handler: function(val1, val2) {
                    // only trigger when its still the same object
                    if (val1 === val2) {
                        if (saveBuffer) {
                            clearTimeout(saveBuffer);
                        }

                        saveBuffer = setTimeout(() => {
                            this.$store.dispatch(this.storeUpdate, this.watch.toBackend()).then(() => {
                                console.log('update (AS) ' + this.watch.projectName);
                                this.localState.showSnackbar = true;
                            });
                        }, 500);
                    }
                },
                deep: true
            }
        }
    }
</script>


<template>
    <md-snackbar
            :md-position="'left'"
            :md-duration="2000"
            :md-active.sync="localState.showSnackbar"
            md-persistent>
        <span>Saved...</span>
    </md-snackbar>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>