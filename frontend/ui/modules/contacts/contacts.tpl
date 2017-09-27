<div id="contacts">
    <div id="contacts-search">
        <div class="header-panel">
            <input type="text" class="big-input" placeholder="Search..." ng-model="filter.search">
        </div>
    </div>

    <div id="contacts-add">
        <div class="header-panel">
            <input type="text" class="big-input" placeholder="Nieuwe relatie..." ng-model="newContact.name">

            <div class="glyph-container">
                <button title="Contact toevoegen" class="glyph fa fa-plus" ng-click="addContact()"></button>
                <span>Relatie toevoegen</span>
            </div>
        </div>
    </div>

    <div id="contacts-loop">
        <div class="contact"
             ng-repeat="contact in filterContacts(model.contacts)"
             ng-class="{'selected': contact === model.currentContact}"
             ng-click="model.currentContact = contact">
            <div class="project-status">
                <div class="overlapper">{{contact.toSlug()}}</div>
            </div>
        </div>
    </div>
</div>

<ofc-contact-detail ofc-model="model.currentContact" ofc-office="model"></ofc-contact-detail>

