<div class="project-row">
    <div class="project-cell project-cell--left">
        <input
            ng-model="newProject.projectName"
            type="text"
            placeholder="Nieuw project...">
    </div>
    <div class="project-cell project-cell-7">
        <div class="flex-wrapper">
            <select
                    ng-model="newProject.member"
                    ng-options="member as member.initials for (index, member) in office.members"
                    title="selecteer teamlid" ></select>
            <select
                    ng-model="newProject.contact"
                    ng-options="contact as contact.toSlug(20) for contact in office.contacts"
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