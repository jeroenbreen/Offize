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

<div class="report-set">
    <h2>
        Geoffreerd
    </h2>
    <div class="report-row" ng-repeat="line in getLines('quotation')">
        <div class="report-tab">
            {{line.text}}
        </div>
        <div class="report-tab report-tab--number">
            <span ng-if="line.lineType === 'count'">
                {{line.hours}}
            </span>
        </div>
        <div class="report-tab report-tab--number">
            {{line.getAmount()}}
        </div>
    </div>
    <div class="report-row report-row--white">
        <div class="report-tab">
            <b>Totaal</b>
        </div>
        <div class="report-tab report-tab--number">
            <b>{{getTotal('quotation', 'hours')}}</b>
        </div>
        <div class="report-tab report-tab--number">
            <b>{{getTotal('quotation', 'amount')}}</b>
        </div>
    </div>
</div>

{{reportOpen}}

<div id="report-close" ng-click="closeReport()">
    <img src="assets/img/close.svg">
</div>

