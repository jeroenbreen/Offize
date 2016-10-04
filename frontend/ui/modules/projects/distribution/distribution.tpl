<div ng-repeat="week in weeks" class="panel">
    <div class="distribution-graph-container">
        <div class="distribution-graph-line"></div>
        <div class="distribution-member-set"
             ng-repeat="member in office.team">
             <div class="distribution-member">{{member.initials}}</div>
             <div class="distribution-block"
                  title="{{formatTitle(block)}}"
                  ng-repeat="block in getBlocks(member, week)"
                  ng-style="{'height': block.hours * 3}"
                  ng-click="selectProject(block)"
                  ng-class="{'selected-project': block.parent === office.currentProject}"></div>
        </div>
    </div>
    <div class="panel-footer">
        <div class="distribution-label">{{week}}</div>
    </div>
</div>