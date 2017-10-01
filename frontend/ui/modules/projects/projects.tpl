<div id="projects">

    <!-- filter -->
    <div id="project-filter">
        <div class="ofc-row">
            <div class="ofc-cell ofc-cell-1">
                <input type="text" placeholder="Zoek..." ng-model="filter.search">
            </div>
            <div class="ofc-cell ofc-cell-7">
                <member-filter model="model" current="filter.member"></member-filter>
                <input type="checkbox" ng-model="showOnlyLiveProjects"> live proj.
                <select title="selecteer jaar" ng-options="year as year for year in model.years" ng-model="filter.year"></select>
            </div>
        </div>
    </div>


    <!-- add new project -->
    <div  id="project-add">
        <div class="ofc-row">
            <div class="ofc-cell ofc-cell-1">
                <input type="text" placeholder="Nieuw project..." ng-model="newProject.projectName">
            </div>
            <div class="ofc-cell ofc-cell-7">
                <select
                    ng-model="newProject.member"
                    ng-options="member as member.initials for (index, member) in model.members"
                    title="selecteer teamlid" ></select>
                <select
                    ng-options="contact as contact.toSlug(20) for contact in model.contacts"
                    ng-model="newProject.contact"
                    title="selecteer opdrachtgever" ></select>
                <button title="opdracht toevoegen" class="glyph fa fa-plus" ng-click="addProject()"></button>
            </div>
        </div>
    </div>


    <!-- projects loop -->
    <div  id="projects-loop">
        <div
            ng-repeat="project in filterProjects(model.projects)"
            ng-class="{'current-project': project === model.currentProject, 'project-finished': project.finished}"
            ng-click="model.currentProject = project"
            class="ofc-row status-{{project.projectStatus}}">
            <div class="ofc-cell ofc-cell-1 project-status project-name">
                <span>{{project.toSlug()}}</span>
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
                    {{commonTools.currencyFormat(project.getBudget())}} {{project.currency}}
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

    <div id="project-sums" ng-if="filter.member && filter.member.memberId === -1">
        <div class="status-total ofc-row" ng-repeat="stat in status">
            <div class="ofc-cell ofc-cell-3">
                {{stat}}
            </div>
            <div class="ofc-cell ofc-cell-3">
                {{commonTools.currencyFormat(totals[$index])}} EUR
            </div>
        </div>
        <div class="status-total ofc-row">
            <div class="ofc-cell ofc-cell-3">
                <b>Totaal</b>
            </div>
            <div  class="ofc-cell ofc-cell-3">
                <b>{{commonTools.currencyFormat(sumOfTotals(totals))}} EUR</b>
            </div>
        </div>
    </div>
</div>

<div id="project-properties" ng-if="model.currentProject">
    <ofc-detail
        project="model.currentProject"
        ofc-office="model"
        ofc-configuration="model.configuration"></ofc-detail>
</div>

