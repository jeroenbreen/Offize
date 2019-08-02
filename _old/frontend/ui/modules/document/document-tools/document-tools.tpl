<div class="document-tools__main">
    <div
        ng-click="print()"
        class="document-tool">
        <i class="fa fa-print"></i>
    </div>

    <div
        ng-if="office.company.usesMail"
        ng-click="mail()"
        class="document-tool">
        <i class="fa fa-paper-plane"></i>
    </div>

    <div
        ng-click="lock()"
        ng-class="{'document-tool--active': document.locked }"
        class="document-tool">
        <i class="fa fa-lock"></i>
    </div>

    <div
        ng-show="!document.locked"
        ng-click="delete()"
        class="document-tool document-tool--warning">
        <i class="fa fa-trash"></i>
    </div>
</div>


<div class="document-tools__extra">
    <div ng-if="document.doctype === 'invoice'">
        <span>Betaald</span>
        <input
            type="checkbox"
            class=""
            value="1"
            ng-model="document.paid"
            ng-change="update()">
    </div>

    <div ng-if="!document.locked">
        <span>
            Verberg total
        </span>
        <input
            type="checkbox"
            ng-model="document.hideTotal"
            ng-change="update()">
    </div>

    <div ng-if="!document.locked">
        <span>
            BTW
        </span>
        <input
            type="text"
            ng-model="document.vat"
            ng-change="update()">
    </div>
</div>

<mails
    ng-if="document.mails.length > 0"
    document="document"></mails>