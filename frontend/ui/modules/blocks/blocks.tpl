<div id="blocks-tools">
    <button title="Vorige Week" class="glyph fa fa-arrow-left" ng-click="prevWeek()"></button>
    <button title="Volgende Week" class="glyph fa fa-arrow-right" ng-click="nextWeek()"></button>
    <div id="block-tools-week-info">
        Week {{dateTool.dateToProperties(date).week}} - {{dateTool.dateToProperties(date).year}}
    </div>
    <select
            ng-model="model.currentMember"
            ng-options="member as member.initials for (index, member) in model.members"
            title="selecteer teamlid" ></select>
    <div class="glyph-container">
        <button title="Volle week toevoegen" class="glyph fa fa-shopping-bag" ng-click="addFullWeek()"></button>
        <span>Volle week toevoegen (5x 3+1)</span>
    </div>
</div>

<div id="week-overview">
    <div ng-repeat="day in week" class="day-container" ng-class="{'today': isToday(day)}">
        <div class="day-label">
            <div>
                {{dateTool.toString(day)}}
            </div>
            <button title="Block toevoegen" class="glyph fa fa-plus" ng-click="addBlock(day, 3)"></button>
        </div>
        <div class="day-blocks">
            <block
                ng-repeat="block in getBlocks(day)"
                block="block"
                ng-class="{'big-block': block.isBig()}"></block>
        </div>
    </div>
</div>

<block-detail
    ng-if="currentBlock"
    block="currentBlock"
    projects="projects"
    jobs="jobs"></block-detail>