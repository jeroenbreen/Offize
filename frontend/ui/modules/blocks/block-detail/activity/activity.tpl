<input ng-model="activity.text" placeholder="Beschrijving werkzaamheden" ng-change="updateActivity()">
<input ng-model="activity.time" placeholder="Uren" class="activity-time-input" ng-change="updateActivity()">

<div class="activity-set-container">
    <div class="activity-set" ng-if="getLines().length > 0">
        <div class="activity-set-label">
            Detail
        </div>
        <select
            ng-model="activity.line"
            ng-options="line as limitString(line.text) for line in getLines()"
            ng-change="updateActivity(); pickDetail()"></select>
    </div>

    <div class="activity-set" ng-if="activity.line.job">
        <div class="activity-set-label">
            Automatisch gekoppelde Categorie
        </div>
        <div class="activity-set-select-style">
            {{activity.job.name}}
        </div>
    </div>


    <div class="activity-set" ng-if="!activity.line.job">
        <div class="activity-set-label">
            Categorie
        </div>
        <select
            ng-model="activity.job"
            ng-options="job as limitString(job.name) for job in jobs"
            ng-change="updateActivity()"></select>
    </div>
</div>