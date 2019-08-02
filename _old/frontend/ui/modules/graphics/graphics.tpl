<div ng-repeat="year in model.years" ng-if="year !== 'alle'">
    <div class="graph-container">
        <div class="graph-month"
             ng-repeat="month in months">
             <div class="graph-bar"
                ng-style="{'height': getAmount(year, month) / 100}">
                <div class="graph-label">EUR {{getAmount(year, month)}}</div>
             </div>
        </div>
        <div class="graph-label-year">
            {{year}}
        </div>
    </div>
</div>