<select
    ng-model="current"
    ng-options="member as member.initials for (index, member) in members"
    title="Selecteer teamlid" ></select>