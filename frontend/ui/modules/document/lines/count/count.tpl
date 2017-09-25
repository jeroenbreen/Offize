<div class="lines-row-c1">
    <input ng-if="!model.parent.locked" placeholder="Post" ng-model="model.text">
    <span ng-if="model.parent.locked">{{model.text}}</span>
</div>
<div class="lines-row-c2">
    <input ng-if="!model.parent.locked" ng-model="model.hours">
    <span ng-if="model.parent.locked">{{model.hours}}</span>
    ×
</div>
<div class="lines-row-c3">
    <input ng-if="!model.parent.locked" ng-model="model.rate">
    <span ng-if="model.parent.locked">{{model.rate}}</span>
</div>
<div class="lines-row-c4">
    {{model.hours * model.rate}} {{model.parent.currency}}
</div>