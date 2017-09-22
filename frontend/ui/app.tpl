<div id="menu">
    <div class="innouveau-square" ng-click="office.currentProject = null; office.currentContact = null"></div>
    <div class="identity">
        <b>Innouveau</b> Office
    </div>
    <div class="menu-select">
        <a ng-repeat="menu in menus"
           ng-class="{'current': office.menu === menu}"
           href="#/{{menu}}">
            {{menu}}
        </a>
    </div>
</div>

<div ng-view class="content"></div>

<ofc-document
    ng-if="office.currentDocument"
    office="office"
    project="office.currentProject"
    document="office.currentDocument"></ofc-document>

<div class="modal"></div>
<div class="confirm">
    <span class="confirm-text"></span>
    <div class="confirmed confirm-button">JA</div>
    <div class="denied confirm-button">Nee</div>
</div>