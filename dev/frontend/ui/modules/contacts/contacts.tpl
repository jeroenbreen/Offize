<div class="contacts-top">
    <div class="contacts-search panel">
        <input placeholder="Search..." ng-model="filter.search">
    </div>

    <div class="contacts-add panel">
        <input class="new-contact" placeholder="Nieuw contact..." ng-model="newContact.name">
        <button title="Contact toevoegen" class="glyph" ng-click="addContact()">+</button>
    </div>

</div>

<div class="contacts-bottom">

    <ofc-contact-detail class="contacts-left"
                        ng-if="model.currentContact"
                        ofc-model="model.currentContact"
                        ofc-office="model"
                        ofc-configuration="model.configuration">
    </ofc-contact-detail>

    <div class="contacts-right">
        <div class="contact-bar"
            ng-repeat="contact in filterContacts(model.contacts)"
            ng-class="{'selected': contact === model.currentContact}"
            ng-click="model.currentContact = contact">
            <div class="project-status">
                <span>{{contact.getSlug()}}</span>
            </div>
        </div>
    </div>


</div>