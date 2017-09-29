{{dateTool.toString(block.date)}}

<clock
    ng-repeat="clock in block.clocks"
    clock="clock"
    projects="projects"
    jobs="jobs"></clock>


<div class="glyph-container">
    <button title="Clock toevoegen" class="glyph fa fa-plus" ng-click="addClock()"></button>
    <span>Clock toevoegen</span>
</div>



<div class="window-close" ng-click="closeDetail()">
    <img src="assets/img/close.svg">
</div>