<div class="project-cell project-cell--left project-status project-name">
    {{project.toSlug()}}
</div>

<div class="project-cell project-cell--middle project-status">
<!--    <div class="project-hours-score">-->
<!--        <div title="totaal gemaakte uren voor deze opdracht" class="worked-hours">{{project.countTotalInActivities()}} / </div>-->
<!--        <div class="total-hours">{{project.hours}}</div>-->
<!--        <div title="voortgang uren opdracht" class="score-bg" ng-class="{'score-over': project.isOverHours()}">-->
<!--            <div ng-style="{'width': project.getModusScore() + '%'}" class="score-fg">&nbsp;</div>-->
<!--        </div>-->
<!--    </div>-->
    {{project.contact.name}}
</div>

<div class="project-cell project-cell--right project-status">
    {{commonTools.currencyFormat(project.getBudget())}}
    {{project.currency}}
</div>

<div class="project-cell project-cell--tools">
    <div
        ng-show="project.projectStatus > 0"
        ng-click="prevStatus()"
        class="document-tool document-tool--small"
        title="opdrachtstatus terug">
        <i class="fa fa-arrow-up"></i>
    </div>

    <div
        ng-if="project.projectStatus == 0"
        class="spacer"></div>

    <div
        ng-show="project.projectStatus < 5"
        ng-click="nextStatus()"
        class="document-tool document-tool--small"
        title="opdrachtstatus vooruit">
        <i class="fa fa-arrow-down"></i>
    </div>

    <div
        ng-if="project.projectStatus == 5"
        class="spacer"></div>
</div>