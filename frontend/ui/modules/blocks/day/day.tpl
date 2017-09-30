<div class="day-label">
    <div>
        {{dateTool.toString(day)}}
    </div>
    <button title="Block toevoegen" class="glyph fa fa-plus" ng-click="addBlock(day, 3)"></button>
</div>
<div class="day-blocks">
    <block
        ng-repeat="block in blocks"
        block="block"
        ng-class="{'big-block': block.isBig()}"></block>
</div>