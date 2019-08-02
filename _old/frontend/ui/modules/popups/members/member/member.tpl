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
    <div class="settings__cell">
        Initialen
    </div>
    <div class="settings__cell">
        <input
            ng-model="member.initials"
            ng-keyup="update()"
            class="input--numbers">
    </div>
</div>

<div class="settings__row">
    <div class="settings__cell">
        Email
    </div>
    <div class="settings__cell">
        <input
            ng-model="member.email"
            ng-keyup="update()">
    </div>
</div>

<div class="settings__row">
    <div class="settings__cell">
        Mail footer
    </div>
    <div class="settings__cell">
        <textarea
            ng-model="member.mailFooter"
            ng-keyup="update()"></textarea>
        <div
            class="mail-footer-preview"
            ng-bind-html="trustAsHtml(member.mailFooter)"></div>
    </div>
</div>

<div class="settings__row">
    <div
        ng-click="remove()"
        class="document-tool__container">
        <div class="document-tool document-tool--warning">
            <i class="fas fa-trash"></i>
        </div>
        <span>{{member.name}} verwijderen</span>
    </div>
</div>