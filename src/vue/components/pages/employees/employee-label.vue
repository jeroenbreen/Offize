<script>
    import Employee from '@classes/Employee';

    export default {
        name: 'employee-label',
        components: {},
        props: {
            employee: {
                type: Employee,
                required: true
            }
        },
        computed: {
            isCurrent() {
                return this.$store.state.employees.current && this.employee.id === this.$store.state.employees.current.id;
            }
        },
        methods: {
            setCurrent() {
                this.$store.commit('employees/setCurrent', this.employee);
                localStorage.currentEmployee = this.employee.id;
            }
        }
    }
</script>


<template>
    <div
        @click="setCurrent()"
        :class="{'page-standard-item--current': isCurrent}"
        class="employee-label page-standard-item">
        {{employee.name}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee-label {

    }
</style>