<div class="project-row">
    <div class="project-cell project-cell--left">
        <input
            ng-model="office.status.projects.filter.search"
            type="text" placeholder="Zoek...">
    </div>
    <div class="project-cell project-cell-7">

        <member-filter
            current="office.status.projects.filter.member"></member-filter>

        <contact-filter
            model="office"
            current="office.status.projects.filter.contact"></contact-filter>

        <select
            ng-options="year as year for year in office.years"
            ng-model="office.status.projects.filter.year"
            title="selecteer jaar"></select>

        <input
            ng-model="office.status.projects.filter.showOnlyLiveProjects"
            type="checkbox"> live proj.
    </div>
</div>