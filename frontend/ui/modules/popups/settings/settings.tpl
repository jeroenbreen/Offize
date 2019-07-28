<div class="overlay">
    <div class="popup__container">
        <div class="popup">
            <div class="popup__body">
                <div class="popup__content settings">
                    <h4>
                        Settings
                    </h4>
                    <div class="settings__table">
                        <div class="settings__set">
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Bedrijfsnaam
                                </div>
                                <div class="settings__cell">
                                    <input ng-model="office.company.name">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Afkorting
                                </div>
                                <div class="settings__cell">
                                    <input ng-model="office.company.companyNameNice">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Straatnaam
                                </div>
                                <div class="settings__cell">
                                    <input ng-model="office.company.address">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Postcode
                                </div>
                                <div class="settings__cell">
                                    <input class="input--numbers" ng-model="office.company.zipcode">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Plaatsnaam
                                </div>
                                <div class="settings__cell">
                                    <input ng-model="office.company.city">
                                </div>
                            </div>
                        </div>
                        <div class="settings__set">
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Standaardtarief
                                </div>
                                <div class="settings__cell">
                                    <input class="input--numbers" ng-model="office.company.standardRate">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Aanvangsjaar
                                </div>
                                <div class="settings__cell">
                                    <input class="input--numbers" ng-model="office.company.startingYear">
                                </div>
                            </div>
                        </div>
                        <div class="settings__set">
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Tekst onder factuur
                                </div>
                                <div class="settings__cell">
                                    <textarea ng-model="office.company.invoiceText"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="settings__set">
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Kleur 1
                                </div>
                                <div class="settings__cell">
                                    <input class="input--numbers" ng-model="office.company.color1">
                                </div>
                            </div>
                            <div class="settings__row">
                                <div class="settings__cell">
                                    Kleur 2
                                </div>
                                <div class="settings__cell">
                                    <input class="input--numbers" ng-model="office.company.color2">
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