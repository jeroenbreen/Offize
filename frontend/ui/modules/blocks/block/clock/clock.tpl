<input ng-model="clock.text" placeholder="Beschrijving werkzaamheden">
<input ng-model="clock.time" placeholder="Uren" class="clock-time-input">
<select ng-model="currentProject" ng-options="project as project.projectName for project in projects"></select>
<select ng-if="currentProject" ng-model="currentJob"  ng-options="line as line.text for line in getLines()"></select>