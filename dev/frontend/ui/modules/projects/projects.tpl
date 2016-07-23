<div class="projects-col-1">
    <table width="96%" cellspacing="0" cellpadding="0" class="ofc-table">
        <!-- filter -->
        <tr class="filter">
            <td width="150" class="project-title">
                <input placeholder="Search..." ng-model="filter.search">
            </td>
            <td>
                <span>
                    <select title="selecteer jaar" ng-options="year as year for year in model.years" ng-model="filter.year"></select>
                </span>
            </td>
            <td width="64px">
            </td>
        </tr>
        <tr>
            <td colspan="3" class="table-spacer"></td>
        </tr>

        <!-- add new project -->
        <tr class="new-project">
            <td class="project-title">
                <input placeholder="Nieuw project..." ng-model="newProject.projectName">
            </td>
            <td>
                <span>
                    <select title="selecteer teamlid" ng-options="member.memberId as member.initials for (index, member) in model.team" ng-model="newProject.memberId"></select>
                    <select title="selecteer opdrachtgever" ng-options="contact.contactId as limitString(contact.getFullName()) for contact in model.contacts" ng-model="newProject.contactId"></select>
                </span>
            </td>
            <td align="right" class="project-buttons">
                <button title="opdracht toevoegen" class="glyph" ng-click="addProject()">
                    +
                </button>
            </td>
        </tr>
        <tr>
            <td colspan="3" class="table-spacer"></td>
        </tr>

        <!-- projects loop -->
        <tr class="animation-item-2 status-{{project.projectStatus}}"
            ng-repeat-start="project in filterProjects(model.projects)"
            ng-class="{'selected': project === model.currentProject}"
            ng-click="model.currentProject = project">
            <td class="project-title project-status">
                <span>{{project.contact.getNumber()}}-{{project.projectName}}</span>
            </td>
            <td class="project-status">
                <div class="project-hours-score">
                    <div title="totaal gemaakte uren voor deze opdracht" class="worked-hours">{{project.getHours()}} / </div>
                    <div class="total-hours">{{project.hours}}</div>
                    <div title="voortgang uren opdracht" class="score-bg" ng-class="{'score-over': project.isOverHours()}">
                        <div ng-style="{'width': project.getModusScore() + '%'}" class="score-fg">&nbsp;</div>
                    </div>
                </div>
                <div class="project-budget">
                    <span>
                        {{project.getBudget(model.configuration.autoCalc)}} {{project.currency}}
                    </span>
                </div>
            </td>
            <td class="project-buttons project-cell">
                <button title="opdrachtstatus terug" class="glyph status-down" ng-click="prevStatus(project)" ng-if="project.projectStatus > 0">
                    ]
                </button>
                <div class="spacer" ng-if="project.projectStatus == 0">
                    &nbsp;
                </div>
                <button title="opdrachtstatus vooruit" class="glyph status-up" ng-click="nextStatus(project)" ng-if="project.projectStatus < 5">
                    [
                </button>
                <div class="spacer" ng-if="project.projectStatus == 5">
                    &nbsp;
                </div>
            </td>
        </tr>
        <tr ng-repeat-end>
            <td colspan="3" class="table-spacer"></td>
        </tr>
        <tr class="status-total" ng-repeat="stat in status">
            <td>
                {{stat}}
            </td>
            <td align="right">{{totals[$index]}} EUR</td>
        </tr>
        <tr class="status-total">
            <td>
                Totaal
            </td>
            <td align="right">{{sumOfTotals(totals)}} EUR</td>
        </tr>
    </table>
</div>

<div class="projects-col-2">
    <ofc-detail ng-if="model.currentProject"
                ofc-model="model.currentProject"
                ofc-office="model"
                ofc-configuration="model.configuration"></ofc-detail>
</div>

<div class="projects-col-3">
    <ofc-comments ng-if="model.currentProject"
                  ofc-model="model.currentProject"
                  ofc-office="model"
                  ofc-configuration="model.configuration"></ofc-comments>
    <ofc-hours ng-if="model.currentProject"
               ofc-model="model.currentProject"
               ofc-office="model"
               ofc-configuration="model.configuration"></ofc-hours>
</div>

<div class="projects-col-4">
    <ofc-distribution ofc-model="model.projects" ofc-office="model"></ofc-distribution>
</div>

