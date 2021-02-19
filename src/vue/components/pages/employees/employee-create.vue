<script>
    import Employee from '@classes/Employee';

    export default {
        name: 'employee-create',
        components: {},
        props: {},
        data() {
            return {
                employee: new Employee()
            }
        },
        computed: {},
        methods: {
            create() {
                if (this.employee.name.length > 0) {
                    this.$store.dispatch('employees/create', {...this.employee}).then((response) => {
                        console.log('employee created');
                        this.employee = new Employee();
                    });
                } else {
                    this.$store.commit('modal/message', {
                        message: 'Vul een naam in.'
                    });
                }
            }
        }
    }
</script>


<template>
    <div class="employee-create">
        <div class="panel">
            <div class="panel-section">
                <input
                        type="text"
                        placeholder="Name"
                        v-model="employee.name"
                        class="input--full">
            </div>


            <div class="panel-section">
                <div
                    @click="create()"
                    class="document-tool__container">
                    <div class="document-tool">
                        <i class="fa fa-plus"></i>
                    </div>
                    <span>Add an employee</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee-create {

    }
</style>