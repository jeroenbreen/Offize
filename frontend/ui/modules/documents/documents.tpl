<div class="frame-top small-top">
    <div class="panel">
        <input placeholder="Zoek factuur" type="text" ng-model="filter.search">
        <input type="radio"
               ng-model="filter.doctype"
               value="'invoice'"
               ng-value="'invoice'"> Facturen
        <input type="radio"
               ng-model="filter.doctype"
               value="'quotation'"
               ng-value="'quotation'"> Offertes
        <select ng-model="filter.year"
                ng-options="year as year for year in model.years"
                title="selecteer jaar"></select>
    </div>
</div>

<div class="frame-bottom small-top">
    <div class="panel panel-spacy">
        <div class="mini-doc"
              ng-repeat="document in filterDocs()"
              ng-class="{
                'selected': document === model.currentDocument,
                'paid': document.paid}"
              ng-click="selectDocument(document)">
                <b>{{document.doctype}} {{document.year}} - {{document.nr}}</b><br>
                {{document.title}}
        </div>
    </div>
</div>

