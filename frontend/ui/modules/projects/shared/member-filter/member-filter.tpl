<select
    ng-model="current"
    ng-options="member as member.initials for (index, member) in members"
    title="selecteer teamlid" ></select>