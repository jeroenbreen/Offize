<div id="blocks-tools">
    <button title="Vorige Week" class="glyph fa fa-arrow-left" ng-click="prevWeek()"></button>
    <button title="Volgende Week" class="glyph fa fa-arrow-right" ng-click="nextWeek()"></button>
    <div id="block-tools-week-info">
        Week {{dateTool.dateToProperties(date).week}} - {{dateTool.dateToProperties(date).year}}
    </div>
    <select
            ng-model="model.currentMember"
            ng-options="member as member.initials for (index, member) in model.members"
            title="selecteer teamlid"
            ng-change="updateBlocks()"></select>
</div>

<div id="week-overview">
    <day ng-repeat="day in week"
        day="day"
        blocks="blockSets[$index]"
        projects="projects"></day>
</div>

<block-detail
    ng-if="currentBlock"
    block="currentBlock"
    jobs="jobs"></block-detail>

<ul id="prev-week-drop" ui-sortable="sortableOptionsPrev" ng-model="prevWeekArray" class="week-drop">
    <li ng-repeat="block in prevWeekArray"></li>
    Schuif door naar<br>
    de vorige week
</ul>

<ul id="next-week-drop" ui-sortable="sortableOptionsNext" ng-model="nextWeekArray" class="week-drop">
    <li ng-repeat="block in nextWeekArray"></li>
    Schuif door naar<br>
    de volgende week
</ul>