<script>
    import Document from '@/store/classes/Document'
    import Client from '@/store/classes/Client'

    export default {
        name: 'document-addresses',
        components: {},
        props: {
            document: {
                type: Document,
                required: true
            },
            client: {
                type: Client,
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
                return this.$store.state.company.all[0];
            },
            employee() {
                let employee = this.$store.getters['employees/getItemById'](this.document.employeeId);
                if (employee) {
                    return employee;
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

        <div class="document__addresses--left">
            <div>
                <b>{{client.name}}</b>
            </div>
            <div >
                <input v-if="!document.locked" v-model="document.clientName">
                <span v-else>
                    {{document.clientName}}
                </span>
            </div>

            <div>
                {{client.street}}
            </div>
            <div>
                {{client.zipcode}} {{client.city}}
            </div>
            <div v-if="client.international">
                VAT: {{client.vat}}
            </div>
        </div>

        <div class="document__addresses--right">
            <div>
                <b>{{company.name}}</b>
            </div>

            <div v-if="!company.companySameAsEmployee">
                <md-field v-if="!document.locked">
                    <md-select
                            v-model="document.employeeId"
                            placeholder="Employee">
                        <md-option
                                v-for="(employee, index) in employees"
                                :value="employee.id"
                                :key="index">{{employee.name}}</md-option>
                    </md-select>
                </md-field>

                <div v-else>
                    {{employee.name}}
                </div>
            </div>

            <div>
                {{company.address}}
            </div>
            <div v-if="company.addressExtra.length > 0">
                {{company.addressExtra}}
            </div>
            <div>
                {{company.zipcode}} {{company.city}}
            </div>
            <div v-if="client.international">
                {{company.country}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .document__addresses {
        line-height: 20px!important;
    }
</style>