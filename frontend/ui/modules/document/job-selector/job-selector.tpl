<div class="job-category"
    ng-repeat="jobCategory in jobCategories">
    <div class="job-category-name">
        {{jobCategory.name}}
    </div>
    <div class="job-category-jobs">
        <div class="job-category-job"
            ng-repeat="job in jobCategory.jobs"
            ng-click="selectJob(job)"
            ng-class="{'current-job' : job === line.job}">
            {{job.name}}
        </div>
    </div>

</div>