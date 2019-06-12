<div id="projects">

    <div class="projects__tools">
        <projects-filter></projects-filter>

        <add-project></add-project>
    </div>


    <div class="projects__loop">
        <project
            ng-repeat="project in office.getProjects()"
            ng-class="{'current-project': project === office.currentProject, 'project-finished': project.finished}"
            ng-click="selectProject(project)"
            class="project-row status-{{project.projectStatus}}"
            project="project">
        </project>
    </div>

    <project-sums ng-if="office.status.projects.filter.member && office.status.projects.filter.member.memberId === -1"></project-sums>
</div>

<div
    ng-if="office.currentProject"
    id="project-properties">
    <ofc-detail
        project="office.currentProject"
        ofc-office="office"
        ofc-configuration="office.configuration"></ofc-detail>
</div>

