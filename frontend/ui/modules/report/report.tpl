

<div id="report-head">
    <h1>
        Rapporage {{getTitle()}}
    </h1>

    <div class="report-set">
        <div class="report-row">
            <div class="report-tab">

            </div>
            <div class="report-tab report-tab--full" ng-repeat="project in newProjects">
                <div class="report-project">
                    <b>{{project.toSlug(16)}}</b>
                    {{project.getRegistrationRate()}}%
                </div>
            </div>
        </div>
        <div class="report-row">
            <div class="report-tab">
                Mode
            </div>
            <div class="report-tab">
                <input type="radio" name="filter-type" ng-model="filter.type" value="description"> Beschrijving
                <input type="radio" name="filter-type" ng-model="filter.type" value="category"> Categorie
            </div>
        </div>
        <div class="report-row">
            <div class="report-tab">
                Toon projecten zonder data
            </div>
            <div class="report-tab">
                <input type="checkbox" ng-model="filter.showEmtptyProjects" ng-change="updateProjects()">
            </div>
        </div>
        <div class="report-row">
            <div class="report-tab">
                Jaar
            </div>
            <div class="report-tab">
                <select title="selecteer jaar" ng-options="year as year for year in app.years" ng-model="filter.year" ng-change="updateProjects()"></select>
            </div>
        </div>
        <div class="report-row">
            <div class="report-tab">
                Status
            </div>
            <div class="report-tab report-tab--full">
                <div class="checkobx-set" ng-repeat="status in app.projectStatusses">
                    <input type="checkbox" ng-model="filter.status[$index]" ng-change="updateProjects()">
                    {{status}}
                </div>
            </div>
        </div>
        <div class="report-row">
            <div class="report-tab">
                Invulminimum
            </div>
            <div class="report-tab report-tab--full">
                <input type="text" ng-model="filter.registrationMinimum" ng-change="updateProjects()">
            </div>
        </div>
    </div>
</div>

<div class="report-set">
    <div class="report-row report-row--full">
        <div class="report-section">
            <div class="report-tab">
                Opgegeven aantal uren
            </div>
            <div class="report-tab report-tab--number">
                {{getSetHours()}}
            </div>
        </div>
    </div>
</div>


<div class="report-set report-set--main">
    <div class="report-row report-row--header">
        <div class="report-section">
            <h2>
                Geoffreerd
            </h2>
        </div>
        <div class="report-section">
            <h2>
                Activiteiten
            </h2>
        </div>
    </div>

    <div id="report-main">
        <div ng-if="filter.type === 'description'" class="report-row" ng-repeat="line in getLines('quotation')">
            <div class="report-section">
                <div class="report-tab">
                    {{line.text}}
                </div>
                <div class="report-tab report-tab--number">
                <span ng-if="line.lineType === 'count'">
                    {{line.hours}}
                </span>
                </div>
                <div class="report-tab report-tab--graph">
                    <graph a="line.hours" b="getSumOfActivities(line)"></graph>
                </div>
            </div>
            <div class="report-section">
                <div class="report-sub-row" ng-repeat="activity in matchActivity(line)">
                    <div class="report-tab">
                        {{activity.getDescription()}}
                    </div>
                    <div class="report-tab report-tab--number">
                        {{activity.time}}
                    </div>
                </div>
            </div>
        </div>

        <div ng-if="filter.type === 'category' && (countJobInLines(job) > 0 || countJobInActivities(job) > 0)" class="report-row" ng-repeat="job in app.getJobs()">
            <div class="report-section">
                <div class="report-tab">
                    {{job.getFullName()}}
                </div>
                <div class="report-tab report-tab--number">
                    {{countJobInLines(job, 'quotation')}}
                </div>
                <div class="report-tab report-tab--graph">
                    <graph a="countJobInLines(job, 'quotation')" b="countJobInActivities(job)"></graph>
                </div>
            </div>
            <div class="report-section">
                <div class="report-tab">
                    {{job.getFullName()}}
                </div>
                <div class="report-tab report-tab--number">
                    {{countJobInActivities(job)}}
                </div>
            </div>
        </div>
    </div>

    <div id="report-uncategorised">
        <div class="report-row report-row--full">
            <div class="report-section">
                <div class="report-tab">
                    Ongecategoriseerd
                </div>
            </div>
            <div class="report-section">
                <div ng-if="filter.type === 'description'" class="report-sub-row" ng-repeat="activity in activities.unmatched">
                    <div class="report-tab">
                        {{activity.getDescription()}}
                    </div>
                    <div class="report-tab report-tab--number">
                        {{activity.time}}
                    </div>
                </div>

                <div ng-if="filter.type === 'category'" class="report-sub-row" ng-repeat="activity in getActivitiesWithoutJob()">
                    <div class="report-tab">
                        {{activity.getDescription()}}
                    </div>
                    <div class="report-tab report-tab--number">
                        {{activity.time}}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="report-sum">
        <div class="report-row report-row--full">
            <div class="report-section">
                <div class="report-tab">
                    <b>Totaal</b>
                </div>
                <div class="report-tab report-tab--number">
                    <b>{{getTotalofLines('quotation')}}</b>
                </div>
                <div class="report-tab report-tab--graph">
                    <graph a="getTotalofLines('quotation')" b="getTotalOfActivities()"></graph>
                </div>
              </div>

            <div class="report-section">
                <div class="report-tab">
                    <b>Totaal</b>
                </div>
                <div class="report-tab report-tab--number">
                    <b>{{getTotalOfActivities()}}</b>
                </div>
            </div>
        </div>
    </div>

</div>


<div class="window-close" ng-click="closeReport()">
    <img src="assets/img/close.svg">
</div>

