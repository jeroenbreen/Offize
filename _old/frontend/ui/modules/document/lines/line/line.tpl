<div ng-if="!document.locked" class="handle" title="posten herordenen">
    <img src="assets/img/drag.png">
</div>

<ofc-count
    ng-if="line.lineType === 'count'"
    line="line"
    document="document"
    class="lines-cell"></ofc-count>

<ofc-amount
    ng-if="line.lineType === 'amount'"
    line="line"
    document="document"
    class="lines-cell"></ofc-amount>

<ofc-text
    ng-if="line.lineType === 'text'"
    line="line"
    document="document"
    class="lines-cell"></ofc-text>

<ofc-enter
    ng-if="line.lineType === 'enter'"
    line="line"
    document="document"
    class="lines-cell"></ofc-enter>

<ofc-subtotal
    ng-if="line.lineType === 'subtotal'"
    ofc-index="$index"
    line="line"
    document="document"
    class="lines-cell"></ofc-subtotal>

<div
    ng-show="!document.locked"
    ng-click="removeLine()"
    class="document-tool document-tool--small document-tool--warning">
    <i class="fa fa-trash"></i>
</div>