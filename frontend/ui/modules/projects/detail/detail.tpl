<div id="project-detail-left">
    <div class="panel">
        <div class="panel-section">
            <input type="text" title="Projectnaam" ng-model="project.projectName" class="project-detail-project-name" ng-change="updateProject()"><br>

            <div
                ng-click="copySlug()"
                class="document-tool__container">
                <div
                    class="document-tool"
                    title="kopieer slug">
                    <i class="fa fa-paperclip"></i>
                </div>
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
            <input class="input-medium" title="boekjaar" ng-model="project.year" ng-change="updateProject()">
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
            <div
                ng-show="project.projectStatus < 5"
                ng-click="archiveProject()"
                class="document-tool__container">
                <div
                    class="document-tool"
                    title="archiveer opdracht">
                    <i class="fas fa-archive"></i>
                </div>
                <span>Archiveren</span>
            </div>


            <div
                ng-show="project.projectStatus === 5"
                ng-click="deArchiveProject()"
                class="document-tool__container">
                <div
                    class="document-tool"
                    title="Breng opdracht terug">
                    <i class="fas fa-reply"></i>
                </div>
                <span>Breng terug</span>
            </div>

            <div
                ng-click="removeProject()"
                class="document-tool__container">
                <div
                    class="document-tool document-tool--warning"
                    title="Verwijder opdracht">
                    <i class="fas fa-trash"></i>
                </div>
                <span>Breng terug</span>
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
                 ng-click="selectDocument(quotation)">
                <span class="gl fa fa-folder-open"></span>
                {{quotation.toSlug()}}
            </div>
        </div>

        <div class="document-tool__container">
            <div
                ng-click="addDocument('quotation')"
                class="document-tool">
                <i class="fa fa-plus"></i>
            </div>
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
                 ng-click="selectDocument(invoice)">
                <span class="gl fa fa-folder-open"></span>
                {{invoice.toSlug()}}
            </div>
        </div>
        <div class="document-tool__container">
            <div
                ng-click="addDocument('invoice')"
                class="document-tool">
                <i class="fa fa-plus"></i>
            </div>
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