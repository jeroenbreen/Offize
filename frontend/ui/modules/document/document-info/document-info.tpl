<div class="document-info__document-id">
    {{document.getPrefix()}}&nbsp;

    <div ng-if="!document.locked">
        <input
                ng-model="document.year"
                ng-change="update()"
                class="document-info__year"> -

        <input
                ng-model="document.nr"
                ng-change="update()"
                class="document-info__nr">
    </div>

    <div ng-if="document.locked">
        {{document.toSlug()}}
    </div>
</div>

<div class="document-info__date">
    <div ng-if="!document.locked">
        <input
            ng-model="document.day"
            ng-change="update()"
            class="document-info__day">

        <select
            ng-model="document.month"
            ng-options="(months.indexOf(month) + 1) as month for month in months"
            ng-change="update()"></select>

        <input
            ng-model="document.year"
            ng-change="update()"
            class="document-info__year">
    </div>

    <div ng-if="document.locked">
        {{document.day}} {{months[document.month - 1]}} {{document.year}}
    </div>
</div>