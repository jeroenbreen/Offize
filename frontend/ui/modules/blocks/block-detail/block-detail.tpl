<div class="block-detail-header">
    {{dateTool.toString(block.date)}}<br>
    <b>{{block.project.toSlug()}}</b>


    <div class="window-close" ng-click="closeDetail()">
        <img src="assets/img/close.svg">
    </div>
</div>

<div class="block-detail-body">
    <div class="block-detail-body-row" ng-repeat="activity in block.activities">
        <activity
            activity="activity"
            project="block.project"
            jobs="jobs"></activity>
        <div class="activity-remove" ng-if="block.activities.length > 1">
            <button title="Item verwijderen" class="glyph fa fa-trash red" ng-click="deleteActivity(activity)"></button>
        </div>
    </div>
</div>

<div class="block-detail-footer">
    <div class="glyph-container">
        <button title="Activiteit toevoegen" class="glyph fa fa-plus" ng-click="createActivity()"></button>
        <span>Activiteit toevoegen</span>
    </div>
    <div class="glyph-container">
        <button title="Block verwijderen" class="glyph fa fa-trash red" ng-click="deleteBlock()"></button>
        <span>Block verwijderen</span>
    </div>
    <div class="glyph-container">
        <input ng-model="block.time" placeholder="00:00" ng-change="updateBlock()">
        <span>Start tijd</span>
    </div>
    <div class="glyph-container">
        <input ng-model="block.done" type="checkbox" ng-change="updateBlock()">
        <span>Afgerond</span>
    </div>
</div>