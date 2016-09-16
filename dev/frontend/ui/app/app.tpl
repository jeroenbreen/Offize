<div id="menu">
    <div class="innouveau-square" ng-click="office.currentProject = null; office.currentContact = null"></div>
    <div class="identity">
        <b>Innouveau</b> Office
    </div>
    <div class="menu-select">
    <select ng-options="menu as menu for menu in menus"
            ng-model="office.menu"></select>
    </div>
</div>

<ofc-projects ng-if="office.menu === 'projects'" ofc-model="office" class="content"></ofc-projects>
<ofc-contacts ng-if="office.menu === 'contacts'" ofc-model="office" class="content"></ofc-contacts>
<ofc-documents ng-if="office.menu === 'documents'" ofc-model="office" class="content"></ofc-documents>
<ofc-graphics ng-if="office.menu === 'graphics'" ofc-model="office" class="content"></ofc-graphics>

<ofc-document ng-if="office.currentDocument" ofc-model="office.currentDocument" ofc-office="office"></ofc-document>
<div class="modal"></div>
<div class="confirm">
    <span class="confirm-text"></span>
    <div class="confirmed confirm-button">JA</div>
    <div class="denied confirm-button">Nee</div>
</div>