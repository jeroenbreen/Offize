<div class="projects-left">
    <table width="96%" cellspacing="0" cellpadding="0" class="ofc-table">
        <!-- filter -->
        <tr class="filter">
            <td colspan="2">
                <input placeholder="Zoek factuur" ng-model="filter.search.invoices">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="table-spacer"></td>
        </tr>

        <!-- documents loop -->
        <tr class="tr-red animation-item-2"
            ng-repeat-start="doc in filterDocs(model.invoices, 'invoices') track by $index"
            ng-click="model.currentDocument = doc; model.currentProject = doc.parent">
            <td width="70">
                <span>{{doc.jaar}} - {{doc.nr}}</span>
            </td>
            <td class="project-status">
                <span>{{doc.omschrijving}}</span>
            </td>
        </tr>
        <tr ng-repeat-end>
            <td colspan="2" class="table-spacer"></td>
        </tr>
    </table>
</div>

<div class="projects-left">
    <table width="96%" cellspacing="0" cellpadding="0" class="ofc-table">
        <!-- filter -->
        <tr class="filter">
            <td colspan="2">
                <input placeholder="Zoek offerte" ng-model="filter.search.tenders">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="table-spacer"></td>
        </tr>

        <!-- documents loop -->
        <tr class="tr-yellow animation-item-2"
            ng-repeat-start="doc in filterDocs(model.tenders, 'tenders')"
            ng-click="model.currentDocument = doc">
            <td width="70">
                <span>{{doc.jaar}} - {{doc.nr}}</span>
            </td>
            <td class="project-status">
                <span>{{doc.omschrijving}}</span>
            </td>
        </tr>
        <tr ng-repeat-end>
            <td colspan="2" class="table-spacer"></td>
        </tr>
    </table>
</div>
