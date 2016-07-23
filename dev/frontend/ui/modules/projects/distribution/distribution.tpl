<div ng-repeat="week in weeks" class="panel">
    <div class="distribution-graph-container">
        <div class="distribution-graph-line"></div>
        <div class="distribution-block"
             ng-style="{'height': getHeight(week, member)}"
             ng-repeat="member in office.team"><div class="distribution-member">{{member.initials}}</div></div>
    </div>
    <div class="panel-footer">
        <div class="distribution-label">{{week}}</div>
    </div>
</div>