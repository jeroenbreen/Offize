<script>
    import Document from '@classes/Document'

    export default {
        name: 'document-addresses',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
            scale: {
                type: Number,
                required: true
            },
            template: {
                type: Object,
                required: true
            }
        },
        computed: {
            company() {
                return this.$store.state.company.current;
            },
            employee() {
                let employee = this.$store.getters['employees/getItemById'](this.document.employeeId);
                if (employee) {
                    return employee;
                }
            },
            client() {
                let project, client;
                project = this.$store.getters['projects/getItemById'](this.document.projectId);
                if (project) {
                    client = this.$store.getters['clients/getItemById'](project.clientId);
                    if (client) {
                        return client;
                    }
                }
            },
            employees() {
                return this.$store.state.employees.all;
            }
        },
        methods: {
            getSize(size) {
                return size * this.scale + 'px';
            }
        }
    }
</script>


<template>
    <div
        :style="{
            'top': getSize(template.addresses.top),
            'padding': getSize(template.addresses.padding)
        }"
        class="document__addresses">

        <div class="document__addresses--left" v-if="!document.locked">
            <b>{{client.name}}</b><br>
            <input v-model="document.clientName">
            {{client.street}}<br>
            {{client.zipcode}} {{client.city}}
        </div>

        <div class="document__addresses--left" v-if="document.locked">
            <b>{{client.name}}</b><br>
            {{document.clientName}}<br>
            {{client.street}}<br>
            {{client.zipcode}} {{client.city}}
        </div>

        <div class="document__addresses--right" v-if="!document.locked">
            <b>{{company.name}}</b><br>
            <md-field>
                <md-select
                    v-model="document.employeeId"
                    placeholder="Employee">
                    <md-option
                        v-for="(employee, index) in employees"
                        :value="employee.id"
                        :key="index">{{employee.name}}</md-option>
                </md-select>
            </md-field>
            {{company.address}}<br>
            {{company.zipcode}} {{company.city}}
        </div>

        <div class="document__addresses--right" v-if="document.locked">
            <b>{{company.name}}</b><br>
            {{employee.name}}<br>
            {{company.address}}<br>
            {{company.zipcode}} {{company.city}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document__addresses {
        line-height: 20px!important;
    }
</style>