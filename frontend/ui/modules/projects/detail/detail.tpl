<div class="panel">
    <div class="panel-body">
        <table class="detail" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td width="70px" class="label-with-input">
                    Projectnaam
                </td>
                <td class="td-content">
                    <input type="text" title="Projectnaam" ng-model="project.projectName"><br>
                    <button title="kopieer slug" class="glyph fa fa-pencil" ng-click="copySlug()"></button>
                    <span class="detail-slug">{{commonTools.toSlug(project.contact.getNumber(), project.projectName)}}</span>
                </td>
            </tr>
            <tr>
                <td class="label-with-input">
                    Contact
                </td>
                <td class="td-content">
                    <select
                        ng-options="member as member.name for (index, member) in office.members"
                        ng-model="project.member"
                        title="verander teamlid"></select>
                </td>
            </tr>
            <tr>
                <td class="label-with-input">
                    Klant
                </td>
                <td class="td-content">
                    <select
                        ng-options="contact as commonTools.limitString(commonTools.toSlug(contact.getNumber(), contact.name), 20) for (index, contact) in office.contacts"
                        ng-model="project.contact"
                        title="Verander klant"></select>
                </td>
            </tr>
            <tr>
                <td class="label-with-input">
                    Projecturen
                </td>
                <td class="td-content">
                    <input class="input-small" title="Projecturen" ng-model="project.hours"> ×
                    <input class="input-small" title="Munt" ng-model="project.currency">
                    <input class="input-small" title="Uurtarief" ng-model="project.rate"> -
                    <input class="input-small" title="Korting / Correctie" ng-model="project.discount">
                </td>
            </tr>
            <tr>
                <td class="label-with-input">
                    Boekjaar
                </td>
                <td class="td-content">
                    <input class="input-medium" title="boekjaar" ng-model="project.year">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Status
                </td>
                <td class="td-content td-status status-{{project.projectStatus}}">
                    <div class="status-label project-status"></div>
                    <div class="status-label-text">
                        {{status[project.projectStatus]}}
                    </div>
                </td>
            </tr>
            <tr ng-if="project.projectStatus === 2">
                <td class="label-with-input">
                    Afgerond
                </td>
                <td class="td-content">
                    <input type="checkbox" ng-model="project.finished"><br>
                </td>
            </tr>
            <tr>
                <td class="label">
                    <span ng-if="project.projectStatus === 5">
                        Breng terug
                    </span>
                    <span ng-if="project.projectStatus < 5">
                        Archiveren
                    </span>
                </td>
                <td class="td-content">
                    <button ng-if="project.projectStatus < 5" title="archiveer opdracht" class="glyph fa fa-paper-plane" ng-click="archiveProject()"></button>
                    <button ng-if="project.projectStatus === 5" title="breng opdracht terug" class="glyph fa fa-reply" ng-click="deArchiveProject()"></button>
                </td>
            </tr>
        </table>
    </div>
    <div class="panel-footer panel-footer-remove">
        <button title="verwijder opdracht" class="glyph red fa fa-trash" ng-click="removeProject()"></button>
    </div>
</div>


<div class="panel">
    <div class="panel-body">
        Offertes<br><br>
        <div title="offerte"
             class="doc"
             ng-repeat="quotation in project.quotations"
             ng-click="office.currentDocument = quotation;">
            <span class="gl fa fa-folder-open"></span>
            {{quotation.year}} - {{quotation.nr}}
        </div>
    </div>
    <div class="panel-footer">
        <button title="Offerte toevoegen" class="glyph fa fa-plus" ng-click="addDocument('quotation')"></button>
    </div>
</div>

<div class="panel">
    <div class="panel-body">
        Facturen<br><br>
        <div title="factuur"
             class="doc"
             ng-repeat="invoice in project.invoices"
             ng-class="{'niet-betaald': !invoice.paid}"
             ng-click="office.currentDocument = invoice;">
            <span class="gl fa fa-folder-open"></span> {{invoice.year}} - {{invoice.nr}}
        </div>
    </div>
    <div class="panel-footer">
        <button title="Factuur toevoegen" class="glyph fa fa-plus" ng-click="addDocument('invoice')"></button>
    </div>
</div>