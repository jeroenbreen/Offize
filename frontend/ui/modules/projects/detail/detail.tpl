<div id="project-detail-left">
    <div class="panel">
        <div class="panel-section">
            <input type="text" title="Projectnaam" ng-model="project.projectName" class="project-detail-project-name" ng-change="updateProject()"><br>
            <div class="glyph-container" ng-if="project.projectStatus < 5">
                <button title="kopieer slug" class="glyph fa fa-paperclip" ng-click="copySlug()"></button>
                <span>Kopieer slug: {{project.toSlug()}}</span>
            </div>
        </div>

        <div class="panel-section">
            <select
                    ng-options="member as member.name for (index, member) in office.members"
                    ng-model="project.member"
                    ng-change="updateProject()"
                    title="verander teamlid"></select>

            <select
                    ng-options="contact as contact.toSlug(20) for (index, contact) in office.contacts"
                    ng-model="project.contact"
                    ng-change="updateProject()"
                    title="Verander klant"></select>
        </div>

        <div id="project-detail-hour-information" class="panel-section">
            <input class="input-small" title="Projecturen" ng-model="project.hours" ng-change="updateProject()"> ×
            <input class="input-small" title="Munt" ng-model="project.currency" ng-change="updateProject()">
            <input class="input-small" title="Uurtarief" ng-model="project.rate" ng-change="updateProject()"> -
            <input class="input-small" title="Korting / Correctie" ng-model="project.discount" ng-change="updateProject()">
        </div>

        <div class="panel-section">
            <input class="input-medium" title="boekjaar" ng-model="project.year">
        </div>

        <div id="project-detail-status-information" class="panel-section status-{{project.projectStatus}}">
            <div class="status-label project-status"></div>
            <div class="status-label-text">
                {{office.projectStatusses[project.projectStatus]}}
            </div>
        </div>

        <div class="panel-section" ng-if="project.projectStatus === 2">
            <input type="checkbox" ng-model="project.finished" ng-change="updateProject()"> Afgerond
        </div>

        <div id="project-detail-actions" class="panel-section">
            <div class="glyph-container" ng-if="project.projectStatus < 5">
                <button title="archiveer opdracht" class="glyph fa fa-paper-plane" ng-click="archiveProject()"></button>
                <span>Archiveren</span>
            </div>

            <div class="glyph-container" ng-if="project.projectStatus === 5">
                <button title="breng opdracht terug" class="glyph fa fa-reply" ng-click="deArchiveProject()"></button>
                <span>Breng terug</span>
            </div>

            <div class="glyph-container">
                <button title="verwijder opdracht" class="glyph red fa fa-trash" ng-click="removeProject()"></button>
                <span>Verwijderen</span>
            </div>
        </div>

        <div class="panel-section">
            <div class="glyph-container">
                <button title="Rapportage" class="glyph fa fa-bar-chart" ng-click="openReport()"></button>
                <span>Rapportage</span>
            </div>
        </div>
    </div>
</div>


<div id="project-detail-right">
    <div class="panel">
        <h2>
            Offertes {{reportOpen}}
        </h2>
        <div class="project-detail-docs">
            <div title="offerte"
                 class="doc office-color"
                 ng-repeat="quotation in project.quotations"
                 ng-click="office.currentDocument = quotation;">
                <span class="gl fa fa-folder-open"></span>
                {{quotation.toSlug()}}
            </div>
        </div>
        <div class="glyph-container">
            <button title="Offerte toevoegen" class="glyph fa fa-plus" ng-click="addDocument('quotation')"></button>
            <span>Offerte toevoegen</span>
        </div>
    </div>

    <div class="panel">
        <h2>
            Facturen
        </h2>
        <div class="project-detail-docs">
            <div title="factuur"
                 class="doc office-color"
                 ng-repeat="invoice in project.invoices"
                 ng-class="{'not-paid': !invoice.paid}"
                 ng-click="office.currentDocument = invoice;">
                <span class="gl fa fa-folder-open"></span>
                {{invoice.toSlug()}}
            </div>
        </div>
        <div class="glyph-container">
            <button title="Factuur toevoegen" class="glyph fa fa-plus" ng-click="addDocument('invoice')"></button>
            <span>Factuur toevoegen</span>
        </div>
    </div>

    <div class="panel">
        <h2>
            Notities
        </h2>
        <ofc-comments
            project="project"
            office="office"></ofc-comments>
    </div>
</div>

<report ng-if="report.open" projects="[project]" report="report" app="office"></report>