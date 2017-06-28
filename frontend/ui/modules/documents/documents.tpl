<div class="frame-top small-top">
    <div class="col col-6">
        <div class="panel">
            <input placeholder="Zoek factuur" type="text" ng-model="filter.search.invoices">
        </div>
    </div>

    <div class="col col-6">
        <div class="panel">
            <input placeholder="Zoek offerte" type="text" ng-model="filter.search.tenders">
        </div>
    </div>
</div>

<div class="frame-bottom small-top">
    <div class="col col-6">
        <div class="panel panel-spacy">
            <div class="mini-doc"
                  ng-repeat="doc in filterDocs(model.invoices, 'invoices') track by $index"
                  ng-class="{'selected': doc === model.currentDocument, 'paid': doc.paid}"
                  ng-click="model.currentDocument = doc; model.currentProject = doc.parent">
                    <b>Factuur {{doc.year}} - {{doc.nr}}</b><br>
                    {{doc.title}}
            </div>
        </div>
    </div>

    <div class="col col-6">
        <div class="panel panel-spacy">
            <div class="mini-doc mini-doc--tender"
                 ng-repeat="doc in filterDocs(model.tenders, 'tenders') track by $index"
                 ng-class="{'selected': doc === model.currentDocument}"
                 ng-click="model.currentDocument = doc; model.currentProject = doc.parent">
                <b>Offerte {{doc.year}} - {{doc.nr}}</b><br>
                {{doc.title}}
            </div>
        </div>
    </div>
</div>

