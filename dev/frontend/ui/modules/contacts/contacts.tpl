<div class="frame-top">
    <div class="col col-4">
        <div class="contacts-search panel">
            <input placeholder="Search..." ng-model="filter.search">
        </div>

        <div class="contacts-add panel">
            <input class="new-contact" placeholder="Nieuw contact..." ng-model="newContact.name">
            <button title="Contact toevoegen" class="glyph" ng-click="addContact()">+</button>
        </div>
    </div>
    <div class="col col-8"></div>
</div>

<div class="frame-bottom">

    <ofc-contact-detail class="col col-4"
                        ng-if="model.currentContact"
                        ofc-model="model.currentContact"
                        ofc-office="model"
                        ofc-configuration="model.configuration">
    </ofc-contact-detail>

    <div class="col col-8">
        <div class="content-bar"
             ng-repeat="contact in filterContacts(model.contacts)"
             ng-class="{'selected': contact === model.currentContact}"
             ng-click="model.currentContact = contact">
            <div class="project-status">
                <div class="overlapper">{{contact.getSlug()}}</div>
            </div>
        </div>
    </div>

</div>