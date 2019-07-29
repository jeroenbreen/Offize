<div class="settings__row">
    <div class="settings__cell">
        Naam
    </div>
    <div class="settings__cell">
        <input
            ng-model="member.name"
            ng-keyup="update()">
    </div>
</div>

<div class="settings__row">
    <div
        ng-click="create()"
        class="document-tool__container">
        <div class="document-tool">
            <i class="fas fa-plus"></i>
        </div>
        <span>{{member.name}} toevoegen</span>
    </div>
</div>