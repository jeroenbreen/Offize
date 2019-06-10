<div id="paper-container" ng-class="{'locked-file': document.locked}">
    <div id="paper">
        <div id="paper-header">
            <img ng-src="print/logo.png">
        </div>

        <div id="paper-info">
            <b>{{document.getPrefix()}}</b>
            <span ng-if="!document.locked">
                <input class="paper-year input-bold" ng-model="document.year" ng-change="updateDocument()"> -
                <input class="paper-nr input-bold" ng-model="document.nr" ng-change="updateDocument()">
            </span>
            <span ng-if="document.locked">
                {{document.year}} - {{document.nr}}
            </span>
            <br>
            <span ng-if="!document.locked">
                <input class="paper-year" ng-model="document.day" ng-change="updateDocument()">
                <select ng-model="document.month"
                        ng-options="(months.indexOf(month) + 1) as month for month in months"
                        ng-change="updateDocument()"></select>
                <input class="paper-year" ng-model="document.year" ng-change="updateDocument()">
            </span>
            <span ng-if="document.locked">
                {{document.day}} {{months[document.month - 1]}} {{document.year}}
            </span>
        </div>

        <div id="paper-contact">
            <div class="paper-contact-left" ng-if="!document.locked">
                <b>{{document.contact.name}}</b><br>
                <input ng-model="document.contactName" ng-change="updateDocument()">
                {{document.contact.street}}<br>
                {{document.contact.zipcode}} {{document.contact.city}}
            </div>
            <div class="paper-contact-left" ng-if="document.locked">
                <b>{{document.contact.name}}</b><br>
                {{document.contactName}}<br>
                {{document.contact.street}}<br>
                {{document.contact.zipcode}} {{document.contact.city}}
            </div>
            <div class="paper-contact-right" ng-if="!document.locked">
                <b>{{office.company.name}}</b><br>
                <select
                    ng-options="member as member.name for member in office.members"
                    ng-model="document.member"
                    ng-change="updateDocument()"></select><br>
                {{office.company.address}}<br>
                {{office.company.zipcode}} {{office.company.city}}
            </div>
            <div class="paper-contact-right" ng-if="document.locked">
                <b>{{office.company.name}}</b><br>
                {{document.member.name}}<br>
                {{office.company.address}}<br>
                {{office.company.zipcode}} {{office.company.city}}
            </div>
        </div>

        <div id="paper-title">
            <b>Betreft:</b>
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

            <div id="lines-new" ng-if="!document.locked">
                <button title="rekenmodel toevoegen" class="glyph grey fa fa-ellipsis-h" ng-click="addLine('count')"></button>
                <button title="vast bedrag toevoegen" class="glyph grey fa fa-eur" ng-click="addLine('amount')"></button>
                <button title="subtotal" class="glyph grey fa fa-calculator" ng-click="addLine('subtotal')"></button>
                <button title="beschrijving toevoegen" class="glyph grey fa fa-align-left" ng-click="addLine('text')"></button>
                <button title="enter toevoegen" class="glyph grey fa fa-paragraph" ng-click="addLine('enter')"></button>
            </div>

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

    <div id="paper-buttons">
        <button ng-click="printFile()" class="glyph grey fa fa-print" title="Print file"></button>
        <button ng-class="{'locked': document.locked}" ng-click="lockFile()" class="glyph grey fa fa-lock" title="Lock file"></button>
        <button ng-if="!document.locked" ng-click="removeDocument()" class="glyph grey red fa fa-trash" title="Delete file"></button>

        <div id="paper-buttons-extra">
            <div ng-if="document.doctype === 'invoice'">
                <span>Betaald</span><input class="" type="checkbox" value="1" ng-model="document.paid" ng-change="updateDocument()">
                <!--<span>PDF Engelstalig</span><input type="checkbox" value="1" ng-model="document.english">-->
                <!--<div ng-if="document.english">-->
                    <!--<span>Zonder BTW</span><input type="checkbox" value="1" ng-model="document.vat">-->
                <!--</div>-->
            </div>
            <div ng-if="!document.locked">
                <span>
                    Verberg total
                </span>
                <input type="checkbox" ng-model="document.hideTotal" ng-change="updateDocument()">
            </div>
            <div>
                <span>
                    BTW
                </span>
                <input type="text" ng-model="document.vat" ng-change="updateDocument()">
            </div>
        </div>
    </div>

    <div class="window-close" ng-click="closeDocument()">
        <img src="assets/img/close-white.svg">
    </div>
</div>