<div class="lines-row-c1">
    <input ng-if="!model.parent.locked" placeholder="Post" ng-model="model.text">
    <span ng-if="model.parent.locked">{{model.text}}</span>
</div>
<div class="lines-row-c2">
    &nbsp;
</div>
<div class="lines-row-c3">
    &nbsp;
</div>
<div class="lines-row-c4">
    <input ng-if="!model.parent.locked" ng-model="model.amount">
    <span ng-if="model.parent.locked">{{model.amount}}</span>
    {{model.parent.currency}}
</div>