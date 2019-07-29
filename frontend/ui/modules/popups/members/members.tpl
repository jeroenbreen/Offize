<div class="overlay">
    <div class="popup__container">
        <div class="popup">
            <div class="popup__body">
                <div class="popup__content settings">
                    <h4>
                        Werknemers
                    </h4>
                    <div class="settings__table">
                        <div class="settings__set">
                            <member
                                    ng-repeat="member in office.members"
                                    member="member"></member>

                            <add-member></add-member>
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


