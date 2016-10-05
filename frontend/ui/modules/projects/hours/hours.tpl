<div class="panel">
    <div class="panel-body">
        <div title="voortgang uren opdracht" class="score-bg" ng-class="{'score-over': model.isOverHours()}" ng-if="model.workedHours.length > 0">
            <div ng-style="{'width': model.getModusScore() + '%'}" class="score-fg">&nbsp;</div>
        </div>

        <table class="hours-table" width="100%" cellspacing="0" cellpadding="0">
            <tr class="animation-item-2" ng-repeat="hour in model.workedHours">
                <td width="30">
                    {{office.getMemberById(hour.memberId).initials}}&nbsp;
                </td>
                <td>
                    {{hour.description}}
                </td>
                <td width="30" class="align-right">
                    {{hour.time}}′
                </td>
                <td width="58" class="align-right">
                    {{formateDate(hour.date)}}
                </td>
                <td width="30">
                    <button ng-click="removeHour(hour)" class="glyph red remove-post fa fa-trash"></button>
                </td>
            </tr>
        </table>
    </div>
    <div class="panel-attachement">
        <select title="selecteer teamlid" ng-options="member.memberId as member.initials for (index, member) in office.team" ng-model="newHour.memberId"></select>
        <input ng-model="newHour.time" placeholder="Tijd in min." class="hours-time">
        <input ng-model="newHour.description" placeholder="Beschrijving" class="hours-description">
    </div>
    <div class="panel-footer">
        <button title="Comment toevoegen" class="glyph fa fa-plus" ng-click="addHour()"></button>
    </div>
</div>