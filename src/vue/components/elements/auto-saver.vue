<script>
    import Client from '@classes/Client';
    import Project from '@classes/Project';

    let saveBuffer = null;

    export default {
        name: 'auto-saver',
        props: {
            watch: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.constructor === Client || value.constructor === Project;
                }
            },
            storeGet: {
                type: String,
                required: true
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
                handler: function() {
                    let frame, oldObject, newObject;
                    frame = {};



                    if (saveBuffer) {
                        clearTimeout(saveBuffer);
                    }

                    // if we get the corresponding element via the store,
                    // we get the state before the update we are going to commit
                    // we can use this state for the undo

                    // this is a hardcoded switch
                    // todo, make a class for settings, with a toBackend function !!
                    if (this.storeGet === 'settings/getAll') {
                        oldObject = this.$store.getters[this.storeGet];
                        newObject = this.watch;
                    } else {
                        oldObject = this.$store.getters[this.storeGet](this.watch._id).toBackend();
                        newObject = this.watch.toBackend();
                    }


                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch(this.storeUpdate, this.watch.toBackend()).then(() => {
                            this.localState.showSnackbar = true;
                        });
                    }, 500);
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