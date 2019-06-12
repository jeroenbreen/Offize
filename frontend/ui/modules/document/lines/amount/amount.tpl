<div class="lines-row-c1">
    <input ng-if="!document.locked" placeholder="Post" ng-model="line.text">
    <span ng-if="document.locked">{{line.text}}</span>
</div>
<div class="lines-row-c2">
    &nbsp;
</div>
<div class="lines-row-c3">
    &nbsp;
</div>
<div class="lines-row-c4">
    <input ng-if="!document.locked" ng-model="line.amount">
    <span ng-if="document.locked">{{line.amount}}</span>
    {{document.currency}}
</div>