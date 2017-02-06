<div class="projects-col projects-col-big">

    <div>
        <!-- filter -->
        <div class="filter ofc-row">
            <div class="ofc-cell ofc-cell-1">
                <input type="text" placeholder="Zoek..." ng-model="filter.search">
            </div>
            <div class="ofc-cell ofc-cell-7">
                <select title="selecteer teamlid" ng-options="member.memberId as member.initials for (index, member) in model.memberFilter" ng-model="filter.memberId"></select>
                <input type="checkbox" ng-model="showOnlyLiveProjects"> live proj.
                <select title="selecteer jaar" ng-options="year as year for year in model.years" ng-model="filter.year"></select>
            </div>
        </div>


        <!-- add new project -->
        <div class="new-project ofc-row">
            <div class="ofc-cell ofc-cell-1">
                <input type="text" placeholder="Nieuw project..." ng-model="newProject.projectName">
            </div>
            <div class="ofc-cell ofc-cell-7">
                <select title="selecteer teamlid" ng-options="member.memberId as member.initials for (index, member) in model.team" ng-model="newProject.memberId"></select>
                <select title="selecteer opdrachtgever" ng-options="contact.contactId as commonTools.limitString(commonTools.toSlug(contact.getNumber(), contact.name), 20) for contact in model.contacts" ng-model="newProject.contactId"></select>
                <button title="opdracht toevoegen" class="glyph fa fa-plus" ng-click="addProject()"></button>
            </div>
        </div>


        <!-- projects loop -->
        <div class="projects">
            <div class="ofc-row status-{{project.projectStatus}}"
                ng-repeat="project in filterProjects(model.projects)"
                ng-class="{'selected': project === model.currentProject, 'project-finished': project.finished}"
                ng-click="model.currentProject = project">
                <div class="ofc-cell ofc-cell-1 project-status project-name">
                    <span>{{commonTools.toSlug(project.contact.getNumber(), project.projectName)}}</span>
                </div>
                <div class="ofc-cell ofc-cell-2 project-status">
                    <div class="project-hours-score">
                        <div title="totaal gemaakte uren voor deze opdracht" class="worked-hours">{{project.getHours()}} / </div>
                        <div class="total-hours">{{project.hours}}</div>
                        <div title="voortgang uren opdracht" class="score-bg" ng-class="{'score-over': project.isOverHours()}">
                            <div ng-style="{'width': project.getModusScore() + '%'}" class="score-fg">&nbsp;</div>
                        </div>
                    </div>

                </div>
                <div class="ofc-cell ofc-cell-3 project-status">
                    <span>
                        {{digitize(project.getBudget(model.configuration.autoCalc))}} {{project.currency}}
                    </span>
                </div>
                <div class="ofc-cell ofc-cell-4">
                    <button title="opdrachtstatus terug" class="glyph status-down fa fa-arrow-up" ng-click="prevStatus(project)" ng-if="project.projectStatus > 0"></button>
                    <div class="spacer" ng-if="project.projectStatus == 0">
                        &nbsp;
                    </div>
                    <button title="opdrachtstatus vooruit" class="glyph status-up fa fa-arrow-down" ng-click="nextStatus(project)" ng-if="project.projectStatus < 5"></button>
                    <div class="spacer" ng-if="project.projectStatus == 5">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>

        <div class="sums" ng-if="!showOnlyLiveProjects">
            <div class="status-total ofc-row" ng-repeat="stat in status">
                <div class="ofc-cell ofc-cell-3">
                    {{stat}}
                </div>
                <div class="ofc-cell ofc-cell-3">
                    {{digitize(totals[$index])}} EUR
                </div>
            </div>
            <div class="status-total ofc-row">
                <div class="ofc-cell ofc-cell-3">
                    <b>Totaal</b>
                </div>
                <div  class="ofc-cell ofc-cell-3">
                    <b>{{digitize(sumOfTotals(totals))}} EUR</b>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="projects-col projects-col-med projects-col-detail">
    <ofc-detail ng-if="model.currentProject"
                ofc-model="model.currentProject"
                ofc-office="model"
                ofc-configuration="model.configuration"></ofc-detail>
</div>

<div class="projects-col projects-col-med">
    <ofc-comments ng-if="model.currentProject"
                  ofc-model="model.currentProject"
                  ofc-office="model"
                  ofc-configuration="model.configuration"></ofc-comments>
</div>

<div class="projects-col projects-col-med">
    <ofc-hours ng-if="model.currentProject"
               ofc-model="model.currentProject"
               ofc-office="model"
               ofc-configuration="model.configuration"></ofc-hours>
</div>

<div class="projects-col projects-col-small">
    <ofc-distribution ofc-model="model.projects" ofc-office="model"></ofc-distribution>
</div>

