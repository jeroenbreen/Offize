<div class="overlay">
    <div
        ng-class="{'locked-file': document.locked}"
        class="popup__container">

        <div id="paper">
            <div id="paper-header">
                <img ng-src="print/logo.png">
            </div>

            <document-info
                document="document"></document-info>

            <document-addresses
                document="document"></document-addresses>

            <div id="paper-title">
                <b>Betreft:</b>&nbsp;
                <input ng-if="!document.locked" ng-model="document.title" ng-change="updateDocument()">
                <div ng-if="document.locked">
                    {{document.title}}
                </div>
            </div>

            <div id="paper-lines">
                <ul ui-sortable="sortableOptions" ng-model="document.lines">
                    <li class="lines-row animation-item-2" ng-repeat="line in document.lines" ng-click="selectLine(line)" ng-class="{'current-line' : line === currentLine}">
                        <line line="line" ofc-document="document"></line>
                    </li>
                </ul>

                <line-tools
                    ng-if="!document.locked"
                    document="document"></line-tools>

                <div id="lines-total" ng-if="!document.hideTotal">
                <span class="left">
                    Totaal
                </span>
                    <span class="right">
                    {{getTotal(1) | number:2}}
                    {{document.currency}}
                </span>
                    <br>
                    <div ng-if="!document.btw">
                    <span class="left">
                        BTW {{document.vat}}%
                    </span>
                        <span class="right">
                        {{getTotal((document.vat / 100)) | number:2}}
                        {{document.currency}}
                    </span>
                        <span class="left lines-total-big">
                        <b>
                            Te betalen
                        </b>
                    </span>
                        <span class="right lines-total-big">
                        <b>
                            {{getTotal((1 + (document.vat / 100))) | number:2}}
                            {{document.currency}}
                        </b>
                    </span>
                    </div>
                </div>

                <div id="dollar-warning" ng-if="document.english">
                    <b>Let op: engels is aangevinkt.</b><br><br>
                    Het kan zijn dat deze factuur/offerte op een andere manier boekhoudkundig (oa BTW aangifte) moet worden verwerkt, dan dat de getoonde vormgeving doet vermoeden!
                </div>
            </div>

            <div id="paper-footer">
                <img ng-src="assets/img/slogan.png">
            </div>
        </div>

        <document-tools
                project="project"
                document="document"></document-tools>

    </div>

    <div
        ng-click="closeDocument()"
        class="popup__close">
    </div>
</div>