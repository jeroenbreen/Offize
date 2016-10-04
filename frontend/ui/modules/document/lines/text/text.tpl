<input ng-if="!model.parent.locked" placeholder="Titel" ng-model="model.text">
<div ng-if="model.parent.locked">
    {{model.text}}
</div>