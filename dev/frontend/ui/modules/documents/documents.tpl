<div class="frame-top">
    <div class="frame-left">
        <div class="panel">
            <input placeholder="Zoek factuur" ng-model="filter.search.invoices">
        </div>
    </div>

    <div class="frame-right">
        <div class="panel">
            <input placeholder="Zoek offerte" ng-model="filter.search.tenders">
        </div>
    </div>
</div>

<div class="frame-bottom">
    <div class="frame-left">
        <div class="panel">
            <div class="mini-doc"
                  ng-repeat="doc in filterDocs(model.invoices, 'invoices') track by $index"
                  ng-class="{'selected': doc === model.currentDocument}"
                  ng-click="model.currentDocument = doc; model.currentProject = doc.parent">
                    <b>{{doc.jaar}} - {{doc.nr}}</b><br>
                    {{doc.omschrijving}}
            </div>
        </div>
    </div>

    <div class="frame-right">
        <div class="panel">
            <div class="mini-doc"
                 ng-repeat="doc in filterDocs(model.tenders, 'tenders') track by $index"
                 ng-class="{'selected': doc === model.currentDocument}"
                 ng-click="model.currentDocument = doc; model.currentProject = doc.parent">
                <b>{{doc.jaar}} - {{doc.nr}}</b><br>
                {{doc.omschrijving}}
            </div>
        </div>
    </div>
</div>

