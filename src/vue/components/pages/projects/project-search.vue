<script>
    export default {
        name: 'project-se',
        components: {},
        props: {},
        data() {
            return {
                searchString: this.$store.state.projects.searchString,
                searchEmployee: this.$store.state.projects.searchEmployee,
                searchClient: this.$store.state.projects.searchClient,
                searchYear: this.$store.state.projects.searchYear,
                searchLiveProjects: this.$store.state.projects.searchLiveProjects
            }
        },
        computed: {
            clients() {
                return [{id: -1, name: 'Alle'}, ...this.$store.state.clients.all];
            },
            employees() {
                return [{id: -1, name: 'Alle'}, ...this.$store.state.employees.all];
            },
            years() {
                let years, currentYear;
                years = ['Alle'];
                currentYear = new Date().getFullYear();
                for (let i = this.$store.state.company.current.startingYear, l = currentYear; i < (l + 1); i++) {
                    years.push(i);
                }
                return years;
            }
        },
        methods: {
            updateSearch() {
                this.$store.commit('projects/updateProperty', {key: 'searchString', value: this.searchString});
            },
            updateEmployee() {
                this.$store.commit('projects/updateProperty', {key: 'searchEmployee', value: this.searchEmployee})
            },
            updateClient() {
                this.$store.commit('projects/updateProperty', {key: 'searchClient', value: this.searchClient})
            },
            updateYear() {
                this.$store.commit('projects/updateProperty', {key: 'searchYear', value: this.searchYear})
            },
            updateLiveProjects() {
                this.$store.commit('projects/updateProperty', {key: 'searchLiveProjects', value: this.searchLiveProjects})
            }
        }
    }
</script>


<template>
    <div class="project-search page-search">
        <div class="panel panel--solo">
            <input
                type="text"
                placeholder="Search for projects..."
                v-model="searchString"
                @keyup="updateSearch()"
                class="input--full">

            <md-field>
                <md-select
                        v-model="searchClient"
                        @md-selected="updateClient()"
                        placeholder="Client">
                    <md-option
                            v-for="(client, index) in clients"
                            :value="client.id"
                            :key="index">{{client.name}}</md-option>
                </md-select>
            </md-field>

            <md-field>
                <md-select
                        v-model="searchEmployee"
                        @md-selected="updateEmployee()"
                        placeholder="Employee">
                    <md-option
                            v-for="(employee, index) in employees"
                            :value="employee.id"
                            :key="index">{{employee.name}}</md-option>
                </md-select>
            </md-field>

            <md-field>
                <md-select
                        v-model="searchYear"
                        @md-selected="updateYear()"
                        placeholder="Year">
                    <md-option
                            v-for="(year, index) in years"
                            :value="year"
                            :key="index">{{year}}</md-option>
                </md-select>
            </md-field>

            <md-checkbox
                v-model="searchLiveProjects"
                @change="updateLiveProjects()">Live projects</md-checkbox>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-search {

        label {
            white-space: nowrap;
            padding-left: 6px!important;
            font-size: 10px;
            font-family: 'Roboto Condensed', sans-serif;
        }
    }
</style>