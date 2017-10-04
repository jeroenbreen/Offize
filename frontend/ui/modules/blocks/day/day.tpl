<div class="day-label" ng-class="{'office-color' : isToday(day)}">
    <div>
        {{dateTool.toString(day)}}
    </div>
    <button title="Block toevoegen" class="glyph fa fa-plus" ng-click="addBlock(day, 3)"></button>
</div>
<ul class="day-blocks" ui-sortable="sortableOptions" ng-model="blocks">
    <li ng-repeat="block in blocks">
        <block
            block="block"
            projects="projects"
            ng-class="{'big-block': block.isBig(), 'done': block.done}"></block>
    </li>
</ul>