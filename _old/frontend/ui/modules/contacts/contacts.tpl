<div id="contacts">
    <div id="contacts-search">
        <div class="header-panel">
            <input type="text" class="big-input" placeholder="Search..." ng-model="filter.search">
        </div>
    </div>

    <div id="contacts-add">
        <div class="header-panel">
            <input type="text" class="big-input" placeholder="Nieuwe relatie..." ng-model="newContact.name">

            <div
                ng-click="addContact()"
                class="document-tool__container">
                <div
                    class="document-tool"
                    title="Contact toevoegen">
                    <i class="fa fa-plus"></i>
                </div>
                <span>Relatie toevoegen</span>
            </div>
        </div>
    </div>

    <div id="contacts-loop">
        <div class="contact"
             ng-repeat="contact in filterContacts(model.contacts)"
             ng-class="{'office-color': contact === model.currentContact}"
             ng-click="model.currentContact = contact">
            <div class="project-status">
                <div class="overlapper">{{contact.toSlug()}}</div>
            </div>
        </div>
    </div>
</div>

<ofc-contact-detail ofc-model="model.currentContact" ofc-office="model"></ofc-contact-detail>

