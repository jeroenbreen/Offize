

<div id="report-head">
    <h1>
        Rapporage {{getTitle()}}
    </h1>

    <div class="report-set">
        <div class="report-row report-row--white">
            <div class="report-tab">
                <b>Opgegeven aantal uren</b>
            </div>
            <div class="report-tab report-tab--number">
                <b>{{getSetHours()}}</b>
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
        <div class="report-row" ng-repeat="line in getLines('quotation')">
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
    </div>

    <div id="report-uncategorised">
        <div class="report-row report-row--full">
            <div class="report-section">
                <div class="report-tab">
                    <b>Ongecategoriseerd</b>
                </div>
            </div>
            <div class="report-section">
                <div class="report-sub-row" ng-repeat="activity in activities.unmatched">
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

