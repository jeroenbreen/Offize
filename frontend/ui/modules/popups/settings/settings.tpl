<div class="overlay">
    <div class="popup__container">
        <div class="popup">
            <div class="popup__body">
                <div class="popup__content settings">
                    <h4>
                        Instellingen
                    </h4>
                    <div class="settings__table">
                        <div class="settings__set">
                            <h5>
                                Bedrijfsinformatie
                            </h5>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Bedrijfsnaam
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.name"
                                        ng-keyup="update()">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Afkorting
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.companyNameNice"
                                        ng-keyup="update()">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Straatnaam
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.address"
                                        ng-keyup="update()">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Postcode
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.zipcode"
                                        ng-keyup="update()"
                                        class="input--numbers">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Plaatsnaam
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.city"
                                        ng-keyup="update()">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    KvK nummer
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.coc"
                                        ng-keyup="update()">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    BTW nummer
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.vat"
                                        ng-keyup="update()">
                                </div>
                            </div>
                        </div>

                        <div class="settings__set">
                            <h5>
                                Overige
                            </h5>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Standaardtarief
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.standardRate"
                                        ng-keyup="update()"
                                        class="input--numbers">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Aanvangsjaar
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.startingYear"
                                        class="input--numbers"
                                        ng-keyup="update()">
                                </div>
                            </div>
                        </div>
                        <div class="settings__set">
                            <h5>
                                Template (factuur / offerte)
                            </h5>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Tekst onder factuur
                                </div>
                                <div class="settings__cell">
                                    <textarea
                                        ng-model="office.company.invoiceText"
                                        ng-keyup="update()"></textarea>
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Url logo
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.logoUrl"
                                        ng-keyup="update()">
                                    <img class="settings-image-preview" ng-src="{{office.company.logoUrl}}">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Url footer image
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.footerImageUrl"
                                        ng-keyup="update()">

                                    <img class="settings-image-preview" ng-src="{{office.company.footerImageUrl}}">
                                </div>
                            </div>
                        </div>
                        <div class="settings__set">
                            <h5>
                                Interface
                            </h5>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Kleur 1
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.color1"
                                        ng-keyup="update()"
                                        class="input--numbers">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Kleur 2
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.color2"
                                        ng-keyup="update()"
                                        class="input--numbers">
                                </div>
                            </div>
                        </div>

                        <div class="settings__set">
                            <h5>
                                Koppelingen
                            </h5>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Mailen
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.usesMail"
                                        ng-change="update()"
                                        type="checkbox">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Google Drive
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.usesGoogleDrive"
                                        ng-change="update()"
                                        type="checkbox">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Acumulus
                                </div>
                                <div class="settings__cell">
                                    <input
                                        ng-model="office.company.usesAcumulus"
                                        ng-change="update()"
                                        type="checkbox">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
                ng-click="close()"
                class="popup__close">
        </div>
    </div>
</div>