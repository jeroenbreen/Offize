<div
    ng-repeat="status in getStatusses()"
    class="status-total project-row">
    <div class="project-cell project-cell--left">
        {{status}}
    </div>
    <div class="project-cell project-cell--right">
        {{commonTools.currencyFormat(getTotalForStatus($index))}} EUR
    </div>
</div>
<div class="status-total project-row">
    <div class="project-cell project-cell--left">
        <b>Totaal (van selectie)</b>
    </div>
    <div  class="project-cell project-cell--right">
        <b>{{commonTools.currencyFormat(getTotalForStatus(null))}} EUR</b>
    </div>
</div>