<div ng-if="!document.locked" class="handle" title="posten herordenen">
    <img src="assets/img/drag.png">
</div>

<ofc-count ofc-model="line" ng-if="line.lineType === 'count'" class="lines-cell"></ofc-count>

<ofc-amount ofc-model="line" ng-if="line.lineType === 'amount'" class="lines-cell"></ofc-amount>

<ofc-text ofc-model="line" ng-if="line.lineType === 'text'" class="lines-cell"></ofc-text>

<ofc-enter ng-if="line.lineType === 'enter'" class="lines-cell"></ofc-enter>

<ofc-subtotal ofc-model="model" ofc-index="$index" ng-if="line.lineType === 'subtotal'" class="lines-cell subtotal"></ofc-subtotal>

<button ng-if="!document.locked" ng-click="removeLine()" class="glyph red remove-post fa fa-trash"></button>