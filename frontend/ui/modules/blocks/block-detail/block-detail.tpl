<div class="block-detail-header">
    {{dateTool.toString(block.date)}}

    <div class="window-close" ng-click="closeDetail()">
        <img src="assets/img/close.svg">
    </div>
</div>

<div class="block-detail-body">
    <div class="block-detail-body-row" ng-repeat="clock in block.clocks">
        <clock
            clock="clock"
            projects="projects"
            jobs="jobs"></clock>
        <div class="clock-remove">
            <button title="Clock verwijderen" class="glyph fa fa-trash red" ng-click="deleteClock(clock)"></button>
        </div>
    </div>
</div>

<div class="block-detail-footer">
    <div class="glyph-container">
        <button title="Clock toevoegen" class="glyph fa fa-plus" ng-click="createClock()"></button>
        <span>Clock toevoegen</span>
    </div>
</div>