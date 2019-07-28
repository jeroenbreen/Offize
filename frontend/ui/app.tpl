<div id="menu">
    <div class="office-square office-color" ng-click="office.currentProject = null; office.currentContact = null"></div>
    <div class="identity">
        <b>{{office.company.companyNameNice}}</b> Office
    </div>
    <div class="menu-select">
        <a ng-repeat="menu in menus"
           ng-class="{'current': office.menu === menu}"
           href="#/{{menu}}">
            {{menu}}
        </a>
    </div>
</div>

<div
    ng-if="office.status.loaded"
    ng-view class="content"></div>

<ofc-document
    ng-if="office.currentDocument"
    office="office"
    project="office.currentProject"
    document="office.currentDocument"></ofc-document>

<mail-popup
    ng-if="office.status.mailPopup.active"></mail-popup>

<settings
    ng-if="office.status.settingsPopup.active"></settings>

<div class="modal"></div>

<div class="confirm">
    <span class="confirm-text"></span>
    <div class="confirmed confirm-button">JA</div>
    <div class="denied confirm-button">Nee</div>
</div>