<div class="panel">
    <div class="panel-body">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tr class="animation-item-2" ng-repeat="hour in model.workedHours">
                <td>
                    {{office.getMemberById(hour.memberId).initials}}&nbsp;
                </td>
                <td>
                    {{hour.description}}
                </td>
                <td align="right">
                    {{hour.time}}′
                </td>
                <td align="right">
                    {{hour.getDate()}}
                </td>
                <td>
                    <button ng-click="removeHour(hour)" class="glyph red remove-post">
                        d
                    </button>
                </td>
            </tr>
        </table>
        <div title="voortgang uren opdracht" class="score-bg" ng-class="{'score-over': model.isOverHours()}" ng-if="model.workedHours.length > 0">
            <div ng-style="{'width': model.getModusScore() + '%'}" class="score-fg">&nbsp;</div>
        </div>
    </div>
    <div class="panel-attachement">
        <select title="selecteer teamlid" ng-options="member.memberId as member.initials for (index, member) in office.team" ng-model="newHour.memberId"></select>
        <input ng-model="newHour.description" placeholder="Beschrijving" class="hours-description">
        <input ng-model="newHour.time" placeholder="Tijd in min." class="hours-time">
    </div>
    <div class="panel-footer">
        <button title="Comment toevoegen" class="glyph" ng-click="addHour()">+</button>
    </div>
</div>