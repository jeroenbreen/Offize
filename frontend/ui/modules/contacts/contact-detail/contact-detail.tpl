<div class="panel">
    <div class="panel-section">
        <div class="contact-detail-set">
            <input title="Projectnaam" ng-model="model.name">
            <div class="contact-detail-label">
                Naam
            </div>
        </div>
        <div class="glyph-container">
            <button title="kopieer slug" class="glyph fa fa-paperclip" ng-click="copySlug()"></button>
            <span>Kopier slug: {{model.toSlug()}}</span>
        </div>
    </div>

    <div class="panel-section">
        <div class="contact-detail-set">
            <input title="Contact" ng-model="model.contactPerson">
            <div class="contact-detail-label">
                Contact
            </div>
        </div>
    </div>

    <div class="panel-section">
        <div class="contact-detail-set">
            <input title="Adres" ng-model="model.street">
            <div class="contact-detail-label">
                Adres
            </div>
        </div>
        <div class="contact-detail-set">
            <input title="Postcode" ng-model="model.zipcode">
            <div class="contact-detail-label">
                Postcode
            </div>
        </div>
        <div class="contact-detail-set">
            <input title="Plaats" ng-model="model.city">
            <div class="contact-detail-label">
                Plaats
            </div>
        </div>
    </div>

    <div class="panel-section">
        <div class="contact-detail-set">
            <input title="Telefoon" ng-model="model.telephone">
            <div class="contact-detail-label">
                Telefoon
            </div>
        </div>
        <div class="contact-detail-set">
            <input title="Email" ng-model="model.email">
            <div class="contact-detail-label">
                Email
            </div>
        </div>
        <div class="contact-detail-set">
            <input title="www" ng-model="model.web">
            <div class="contact-detail-label">
                www
            </div>
        </div>
    </div>

    <div class="panel-section">
        <div class="contact-detail-set">
            <input title="Uurtarief" class="input-small" ng-model="model.rate">
            <div class="contact-detail-label">
                Uurtarief
            </div>
        </div>
    </div>

    <div class="panel-section">
        <div class="glyph-container">
            <button title="Verwijder relatie" class="glyph red fa fa-trash" ng-click="removeContact()"></button>
            <span>Verwijder relatie</span>
        </div>
    </div>


</div>