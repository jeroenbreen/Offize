<div id="projects">

    <projects-filter></projects-filter>


    <!-- add new project -->
    <div  id="project-add">
        <div class="project-row">
            <div class="project-cell project-cell--left">
                <input type="text" placeholder="Nieuw project..." ng-model="newProject.projectName">
            </div>
            <div class="project-cell project-cell-7">
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


    <div  id="projects-loop">
        <project
            ng-repeat="project in office.getProjects()"
            ng-class="{'current-project': project === model.currentProject, 'project-finished': project.finished}"
            ng-click="selectProject(project)"
            class="project-row status-{{project.projectStatus}}"
            project="project">
        </project>
    </div>

    <project-sums ng-if="filter.member && filter.member.memberId === -1"></project-sums>
</div>

<div id="project-properties" ng-if="model.currentProject">
    <ofc-detail
        project="model.currentProject"
        ofc-office="model"
        ofc-configuration="model.configuration"></ofc-detail>
</div>

