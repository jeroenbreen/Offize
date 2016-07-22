<div ng-repeat="week in weeks" class="distribution-graph-container">
    <div>{{week}}</div>
        <div class="distribution-block"
             ng-style="{'height': getHeight(week, member)}"
             ng-repeat="member in office.team">{{member.initials}}</div>
    </div>
</div>