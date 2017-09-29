<input ng-model="clock.text" placeholder="Beschrijving werkzaamheden">
<input ng-model="clock.time" placeholder="Uren" class="clock-time-input">

<div class="clock-set-container">
    <div class="clock-set">
        <div class="clock-set-label">
            Project
        </div>
        <select ng-model="clock.project" ng-options="project as project.projectName for project in projects"></select>
    </div>
</div>

<div class="clock-set-container"  ng-if="clock.project">
    <div class="clock-set">
        <div class="clock-set-label">
            Detail
        </div>
        <select
            ng-model="clock.line"
            ng-options="line as limitString(line.text) for line in getLines()"></select>
    </div>

    of

    <div class="clock-set">
        <div class="clock-set-label">
            Categorie
        </div>
        <select
            ng-model="clock.job"
            ng-options="job as limitString(job.name) for job in jobs"></select>
    </div>

</div>
