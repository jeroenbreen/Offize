<div class="paper-contact-left" ng-if="!document.locked">
    <b>{{document.contact.name}}</b><br>
    <input ng-model="document.contactName" ng-change="updateDocument()">
    {{document.contact.street}}<br>
    {{document.contact.zipcode}} {{document.contact.city}}
</div>
<div class="paper-contact-left" ng-if="document.locked">
    <b>{{document.contact.name}}</b><br>
    {{document.contactName}}<br>
    {{document.contact.street}}<br>
    {{document.contact.zipcode}} {{document.contact.city}}
</div>

<div class="paper-contact-right" ng-if="!document.locked">
    <b>{{office.company.name}}</b><br>
    <select
            ng-options="member as member.name for member in office.members"
            ng-model="document.member"
            ng-change="updateDocument()"></select><br>
    {{office.company.address}}<br>
    {{office.company.zipcode}} {{office.company.city}}
</div>
<div class="paper-contact-right" ng-if="document.locked">
    <b>{{office.company.name}}</b><br>
    {{document.member.name}}<br>
    {{office.company.address}}<br>
    {{office.company.zipcode}} {{office.company.city}}
</div>