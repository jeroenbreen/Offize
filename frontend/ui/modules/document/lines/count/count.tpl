<div class="lines-row-c1">
    <input placeholder="Post" ng-model="model.title">
</div>
<div class="lines-row-c2">
    <input ng-model="model.hours">
    x
</div>
<div class="lines-row-c3">
    <input ng-model="model.rate">
</div>
<div class="lines-row-c4">
    {{model.hours * model.rate}} {{model.parent.currency}}
</div>