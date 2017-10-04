<div class="block-head">
    <div class="block-head-time" ng-if="block.time.length > 0">
        {{block.time}} - {{block.getEndTime()}}
    </div>
    <select
        ng-model="block.project"
        ng-options="project as project.toSlug(20, true) for project in projects"
        ng-change="updateBlock()"></select>
    <button title="Voeg meer info toe" class="glyph fa fa-clone" ng-click="openBlock()"></button>
</div>


<div class="block-body">
    <div ng-repeat="activity in block.activities" class="block-row">
        <div class="block-title">
            {{activity.getDescription()}}
        </div>
        <input ng-model="activity.time" placeholder="Uren" class="activity" ng-change="updateActivity(activity)">
    </div>
</div>