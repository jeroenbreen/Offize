<div
    ng-repeat="status in office.projectStatusses"
    class="status-total project-row">
    <div class="project-cell project-cell--right">
        {{status}}
    </div>
    <div class="project-cell project-cell--right">
        {{commonTools.currencyFormat(0)}} EUR
    </div>
</div>
<div class="status-total project-row">
    <div class="project-cell project-cell--right">
        <b>Totaal</b>
    </div>
    <div  class="project-cell project-cell--right">
        <b>{{commonTools.currencyFormat(sumOfTotals())}} EUR</b>
    </div>
</div>