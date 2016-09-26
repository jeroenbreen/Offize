<div class="panel">
    <div class="panel-body">
        <table class="detail" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td width="70px" class="label">
                    Projectnaam
                </td>
                <td>
                    <input title="Projectnaam" ng-model="model.projectName"><br><br>
                    Slug:<br>{{commonTools.toSlug(model.contact.getNumber(), model.projectName)}}
                    <br><br>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Contact
                </td>
                <td>
                    <select title="verander teamlid" ng-options="member.memberId as member.initials for (index, member) in office.team" ng-model="model.memberId"></select>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Klant
                </td>
                <td>
                    <select title="Verander klant" ng-options="contact.contactId as commonTools.limitString(commonTools.toSlug(contact.getNumber(), contact.name), 20) for (index, contact) in office.contacts" ng-model="model.contactId"></select>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Projecturen
                </td>
                <td>
                    <input class="detail-hours" title="Projecturen" ng-model="model.hours"> x
                    <input class="detail-currency" title="Munt" ng-model="model.currency">
                    <input class="detail-rate" title="Uurtarief" ng-model="model.rate"> -
                    <input class="detail-discount" title="Korting / Correctie" ng-model="model.discount">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Boekjaar
                </td>
                <td>
                    <input title="boekjaar" ng-model="model.year">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Startweek
                </td>
                <td>
                    <input title="weeknummer" ng-model="model.week"><br>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Doorloop
                </td>
                <td>
                    <div class="distribution-set" ng-repeat="distributionWeek in model.distributionWeeks">
                        <div class="distribution-week">week {{addWeek(model.week, $index)}}</div>
                        <input ng-model="member.hours"
                               class="distribution-input"
                               placeholder="{{member.initials}}"
                               ng-repeat-start="member in distributionWeek.distributions">
                        <div class="superscript" ng-repeat-end>{{member.initials}}</div>
                    </div>
                    <div class="distribution-tools">
                        <button class="glyph" ng-click="subtractWeekToDistribution()" title="week verwijderen"> - </button>
                        <button class="glyph" ng-click="addWeekToDistribution()" title="week toevoegen"> + </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Status
                </td>
                <td class="td-status status-{{model.projectStatus}}">
                    <div class="status-label project-status"></div> {{status[model.projectStatus]}}
                </td>
            </tr>
            <tr ng-if="model.projectStatus === 2">
                <td class="label">
                    Afgerond
                </td>
                <td>
                    <input type="checkbox" ng-model="model.finished"><br>
                </td>
            </tr>
        </table>
    </div>
    <div class="panel-footer panel-footer-remove">
        <button title="verwijder opdracht" class="glyph red" ng-click="removeProject()">d</button>
    </div>
</div>


<div class="panel">
    <div class="panel-body">
        Offertes<br><br>
        <div title="offerte"
             class="doc"
             ng-repeat="tender in model.tenders"
             ng-click="office.currentDocument = tender;">
            <span class="gl">f</span> {{tender.year}} - {{tender.nr}}
        </div>
    </div>
    <div class="panel-footer">
        <button title="Offerte toevoegen" class="glyph" ng-click="addDocument('tenders')">+</button>
    </div>
</div>

<div class="panel">
    <div class="panel-body">
        Facturen<br><br>
        <div title="factuur"
             class="doc"
             ng-repeat="invoice in model.invoices"
             ng-class="{'niet-betaald': !invoice.betaald}"
             ng-click="office.currentDocument = invoice;">
            <span class="gl">f</span> {{invoice.year}} - {{invoice.nr}}
        </div>
    </div>
    <div class="panel-footer">
        <button title="Factuur toevoegen" class="glyph" ng-click="addDocument('invoices')">+</button>
    </div>
</div>