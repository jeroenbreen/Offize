<div class="block-head">
    <select
        ng-model="block.project"
        ng-options="project as project.toSlug(20) for project in projects"
        ng-change="updateBlock()"></select>
</div>


<div class="block-body">
    <div ng-repeat="activity in block.activities" class="block-row">
        <div class="block-title">
            {{activity.getDescription()}}
        </div>
        <input ng-model="activity.time" placeholder="Uren" class="activity" ng-change="updateActivity(activity)">
    </div>
</div>


<div class="block-footer">
    <button title="Voeg meer info toe" class="glyph fa fa-clone" ng-click="openBlock()"></button>
</div>