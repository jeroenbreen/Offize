<div class="document-tools__main">
    <button
        ng-click="printFile()"
        class="glyph grey fa fa-print"
        title="Print file"></button>

    <button
        ng-click="lockFile()"
        ng-class="{'locked': document.locked}"
        class="glyph grey fa fa-lock"
        title="Lock file"></button>

    <button
        ng-if="!document.locked"
        ng-click="removeDocument()"
        class="glyph grey red fa fa-trash"
        title="Delete file"></button>
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

    <div>
        <span>
            BTW
        </span>
        <input
            type="text"
            ng-model="document.vat"
            ng-change="update()">
    </div>
</div>