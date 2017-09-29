<div ng-repeat="clock in block.clocks" class="block-row">
    <div class="block-title">
        {{clock.project.toSlug()}}&nbsp;
    </div>
    <input ng-model="clock.time" placeholder="Uren" class="clock-time-input">
</div>

<div class="block-tools">
    <button title="Voeg meer info toe" class="glyph fa fa-clone" ng-click="openBlock()"></button>
</div>