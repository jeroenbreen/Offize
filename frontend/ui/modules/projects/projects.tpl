<div id="projects">

    <!-- filter -->
    <div id="project-filter">
        <div class="ofc-row">
            <div class="ofc-cell ofc-cell-1">
                <input type="text" placeholder="Zoek..." ng-model="filter.search">
            </div>
            <div class="ofc-cell ofc-cell-7">
                <member-filter model="model" current="filter.member"></member-filter>
                <contact-filter model="model" current="filter.contact"></contact-filter>
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
                <div class="flex-wrapper">
                    <select
                        ng-model="newProject.member"
                        ng-options="member as member.initials for (index, member) in model.members"
                        title="selecteer teamlid" ></select>
                    <select
                        ng-options="contact as contact.toSlug(20) for contact in model.contacts"
                        ng-model="newProject.contact"
                        title="selecteer opdrachtgever" ></select>

                    <div
                        ng-click="addProject()"
                        class="document-tool"
                        title="opdracht toevoegen">
                        <i class="fa fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- projects loop -->
    <div  id="projects-loop">
        <div
            ng-repeat="project in filterProjects(model.projects)"
            ng-class="{'current-project': project === model.currentProject, 'project-finished': project.finished}"
            ng-click="selectProject(project)"
            class="ofc-row status-{{project.projectStatus}}">
            <div class="ofc-cell ofc-cell-1 project-status project-name">
                <span>{{project.toSlug()}}</span>
            </div>
            <div class="ofc-cell ofc-cell-2 project-status">
                <div class="project-hours-score">
                    <div title="totaal gemaakte uren voor deze opdracht" class="worked-hours">{{project.countTotalInActivities()}} / </div>
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
                <div class="flex-wrapper">
                    <div
                        ng-show="project.projectStatus > 0"
                        ng-click="prevStatus(project)"
                        class="document-tool document-tool--small"
                        title="opdrachtstatus terug">
                        <i class="fa fa-arrow-up"></i>
                    </div>

                    <div class="spacer" ng-if="project.projectStatus == 0"></div>

                    <div
                        ng-show="project.projectStatus < 5"
                        ng-click="nextStatus(project)"
                        class="document-tool document-tool--small"
                        title="opdrachtstatus vooruit">
                        <i class="fa fa-arrow-down"></i>
                    </div>

                    <div class="spacer" ng-if="project.projectStatus == 5"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="project-sums" ng-if="filter.member && filter.member.memberId === -1">
        <div class="status-total ofc-row" ng-repeat="stat in office.projectStatusses">
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

