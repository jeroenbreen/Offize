<script>
    import employeeSearch from './employee-search';
    import employeeDetails from './employee-details';
    import employeeCreate from './employee-create';
    import employeeLabel from './employee-label';

    export default {
        name: 'employees',
        components: {
            employeeSearch, employeeCreate, employeeDetails, employeeLabel
        },
        props: {},
        computed: {
            currentEmployee() {
                return this.$store.state.employees.current;
            },
            employees() {
                return this.$store.getters['employees/getFiltered'](['name']);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="employees">
        <employee-create/>

        <div class="page__list">
            <employee-search/>

            <div class="page__search-results">
                <employee-label
                        v-for="(employee, index) in employees"
                        :key="index"
                        :employee="employee"/>
            </div>
        </div>

        <employee-details
            v-if="currentEmployee"
            :employee="currentEmployee"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .employees {
        display: flex;
        height: 100%;

        .employee-create {
            width: 400px;
            margin-right: 20px;
        }
    }
</style>