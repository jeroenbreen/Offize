<div class="lines-row-c1">
    <input ng-if="!document.locked" placeholder="Post" ng-model="model.text">
    <span ng-if="document.locked">{{model.text}}</span>
</div>
<div class="lines-row-c2">
    &nbsp;
</div>
<div class="lines-row-c3">
    &nbsp;
</div>
<div class="lines-row-c4">
    <input ng-if="!document.locked" ng-model="model.amount">
    <span ng-if="document.locked">{{model.amount}}</span>
    {{document.currency}}
</div>