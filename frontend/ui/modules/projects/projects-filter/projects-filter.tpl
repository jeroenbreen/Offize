<div class="project-row">
    <div class="project-cell project-cell--left">
        <input
            ng-model="office.projects.filter.search"
            type="text" placeholder="Zoek...">
    </div>
    <div class="project-cell project-cell-7">

        <member-filter
            model="office"
            current="office.projects.filter.member"></member-filter>

        <contact-filter
            model="office"
            current="office.projects.filter.contact"></contact-filter>

        <input
            ng-model="office.projects.showOnlyLiveProjects"
            type="checkbox"> live proj.

        <select
            ng-options="year as year for year in office.years"
            ng-model="office.projects.filter.year"
            title="selecteer jaar"></select>
    </div>
</div>