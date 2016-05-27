<div class="projects-left">
    <table width="96%" cellspacing="0" cellpadding="0" class="ofc-table">
        <!-- filter -->
        <tr class="filter">
            <td colspan="2">
                <input placeholder="Search..." ng-model="filter.search">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="table-spacer"></td>
        </tr>

        <!-- add new contact -->
        <tr class="new-project">
            <td colspan="2">
                <input class="new-contact" placeholder="Nieuw contact..." ng-model="newContact.name">
                <button title="Contact toevoegen" class="glyph" ng-click="addContact()">
                    +
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="3" class="table-spacer"></td>
        </tr>

        <!-- contacts loop -->
        <tr class="tr-red animation-item-2"
            ng-repeat-start="contact in filterContacts(model.contacts)"
            ng-class="{'selected': contact === model.currentContact}"
            ng-click="model.currentContact = contact">
            <td width="70">
                <span>{{commonTools.digitize(contact.contactId)}}</span>
            </td>
            <td class="project-status">
                <span>{{contact.name}}</span>
            </td>
        </tr>
        <tr ng-repeat-end>
            <td colspan="2" class="table-spacer"></td>
        </tr>
    </table>
</div>

<ofc-contact-detail class="projects-middle"
            ng-if="model.currentContact"
            ofc-model="model.currentContact"
            ofc-office="model"
            ofc-configuration="model.configuration"></ofc-contact-detail>
