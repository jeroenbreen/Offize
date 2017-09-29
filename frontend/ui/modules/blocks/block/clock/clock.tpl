<input ng-model="clock.text" placeholder="Beschrijving werkzaamheden">
<input ng-model="clock.time" placeholder="Uren" class="clock-time-input">

<div class="clock-set">
    Project:
    <select ng-model="currentProject" ng-options="project as project.projectName for project in projects"></select>
</div>

<div class="clock-set">
    Detail:
    <select
        ng-if="currentProject"
        ng-model="currentLine"
        ng-options="line as limitString(line.text) for line in getLines()"></select>
    of
    <select
        ng-if="currentProject"
        ng-model="currentJob"
        ng-options="job as limitString(job.name) for job in jobs"></select>
</div>