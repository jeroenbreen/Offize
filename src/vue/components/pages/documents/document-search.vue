<script>
    export default {
        name: 'document-search',
        components: {},
        data(){
            return {
                types: [
                    {
                        tag: 'invoice',
                        title: 'Factuur'
                    }, {
                        tag: 'quotation',
                        title: 'Offerte'
                    }
                ],
                searchString: this.$store.state.documents.searchString,
                searchType: this.$store.state.documents.searchType,
                searchYear: this.$store.state.documents.searchYear,
            }
        },
        props: {},
        computed: {
            years() {
                let years, currentYear;
                years = ['Alle'];
                currentYear = new Date().getFullYear();
                for (let i = this.$store.state.company.all[0].startingYear, l = currentYear; i < (l + 1); i++) {
                    years.push(i);
                }
                return years;
            }
        },
        methods: {
            updateSearch() {
                this.$store.commit('documents/updateProperty', {key: 'searchString', value: this.searchString});
            },
            updateType() {
                this.$store.commit('documents/updateProperty', {key: 'searchType', value: this.searchType})
            },
            updateYear() {
                this.$store.commit('documents/updateProperty', {key: 'searchYear', value: this.searchYear})
            }
        }
    }
</script>


<template>
    <div class="document-search page-search">
        <div class="panel panel--solo">
            <input
                    type="text"
                    placeholder="Search for documents..."
                    v-model="searchString"
                    @keyup="updateSearch()"
                    class="input--full">

            <md-field>
                <md-select
                        v-model="searchType"
                        @md-selected="updateType()"
                        placeholder="Type">
                    <md-option
                            v-for="(type, index) in types"
                            :value="type.tag"
                            :key="index">{{type.title}}</md-option>
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
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-search {

    }
</style>