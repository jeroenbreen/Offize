<div class="mails__header">
    Mails
</div>

<div class="mails__body">
    <mail
        ng-repeat="mail in getMails()"
        ng-click="openMail(mail)"
        mail="mail"></mail>
</div>