<div class="lines-row-c1">
    <input ng-if="!document.locked" placeholder="Post" ng-model="line.text">
    <span ng-if="document.locked">{{line.text}}</span>
</div>
<div class="lines-row-c2">
    <input ng-if="!document.locked" ng-model="line.hours">
    <span ng-if="document.locked">{{line.hours}}</span>
    ×
</div>
<div class="lines-row-c3">
    <input ng-if="!document.locked" ng-model="line.rate">
    <span ng-if="document.locked">{{line.rate}}</span>
</div>
<div class="lines-row-c4">
    {{line.hours * line.rate}} {{document.currency}}
</div>