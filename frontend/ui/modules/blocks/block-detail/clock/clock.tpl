<input ng-model="clock.text" placeholder="Beschrijving werkzaamheden" ng-change="updateClock()">
<input ng-model="clock.time" placeholder="Uren" class="clock-time-input" ng-change="updateClock()">

<div class="clock-set-container">
    <div class="clock-set">
        <div class="clock-set-label">
            Project
        </div>
        <select
            ng-model="clock.project"
            ng-options="project as project.projectName for project in projects"
            ng-change="updateClock()"></select>
    </div>
</div>

<div class="clock-set-container"  ng-if="clock.project">
    <div class="clock-set">
        <div class="clock-set-label">
            Detail
        </div>
        <select
            ng-model="clock.line"
            ng-options="line as limitString(line.text) for line in getLines()"
            ng-change="updateClock()"></select>
    </div>

    of

    <div class="clock-set">
        <div class="clock-set-label">
            Categorie
        </div>
        <select
            ng-model="clock.job"
            ng-options="job as limitString(job.name) for job in jobs"
            ng-change="updateClock()"></select>
    </div>
</div>