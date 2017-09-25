<div id="paper-container" ng-class="{'locked-file': document.locked}">
    <div id="paper">
        <div id="paper-header">
            <img ng-src="assets/img/logo.png">
        </div>

        <div id="paper-info">
            <b>{{document.getPrefix()}}</b>
            <span ng-if="!document.locked">
                <input class="paper-year input-bold" ng-model="document.year"> -
                <input class="paper-nr input-bold" ng-model="document.nr">
            </span>
            <span ng-if="document.locked">
                {{document.year}} - {{document.nr}}
            </span>
            <br>
            <span ng-if="!document.locked">
                <input class="paper-year" ng-model="document.day">
                <select ng-model="document.month"
                        ng-options="(months.indexOf(month) + 1) as month for month in months"></select>
                <input class="paper-year" ng-model="document.year">
            </span>
            <span ng-if="document.locked">
                {{document.day}} {{months[document.month - 1]}} {{document.year}}
            </span>
        </div>

        <div id="paper-contact">
            <div class="paper-contact-left" ng-if="!document.locked">
                <b>{{document.contact.name}}</b><br>
                <input ng-model="document.contactName">
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
                    ng-model="document.member"></select><br>
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
            <br>
            <input ng-if="!document.locked" ng-model="document.title">
            <div ng-if="document.locked">
                {{document.title}}
            </div>
        </div>

        <div id="paper-lines">
            <b>
                Werkzaamheden:
            </b>
            <br>
            <ul ui-sortable="sortableOptions" ng-model="document.lines">
                <li class="lines-row animation-item-2" ng-repeat="line in document.lines" >
                    <div ng-if="!document.locked" class="handle" title="posten herordenen">
                        <img src="assets/img/drag.png">
                    </div>

                    <ofc-count ofc-model="line" ng-if="line.type === 'count'" class="lines-cell"></ofc-count>

                    <ofc-amount ofc-model="line" ng-if="line.type === 'amount'" class="lines-cell"></ofc-amount>

                    <ofc-text ofc-model="line" ng-if="line.type === 'text'" class="lines-cell"></ofc-text>

                    <ofc-enter ng-if="line.type === 'enter'" class="lines-cell"></ofc-enter>

                    <ofc-subtotal ofc-model="model" ofc-index="$index" ng-if="line.type === 'subtotal'" class="lines-cell subtotal"></ofc-subtotal>

                    <button ng-if="!document.locked" ng-click="removeLine(line)" class="glyph red remove-post fa fa-trash"></button>
                </li>
            </ul>

            <div id="lines-new" ng-if="!document.locked">
                <button title="rekenmodel toevoegen" class="glyph grey fa fa-ellipsis-h" ng-click="document.addLine('count')"></button>
                <button title="vast bedrag toevoegen" class="glyph grey fa fa-eur" ng-click="document.addLine('amount')"></button>
                <button title="subtotal" class="glyph grey fa fa-calculator" ng-click="document.addLine('subtotal')"></button>
                <button title="beschrijving toevoegen" class="glyph grey fa fa-align-left" ng-click="document.addLine('text')"></button>
                <button title="enter toevoegen" class="glyph grey fa fa-paragraph" ng-click="document.addLine('enter')"></button>
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
                    <span class="left">
                        <b>
                            Te betalen
                        </b>
                    </span>
                    <span class="right">
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
    </div>

    <div id="paper-buttons">
        <button class="glyph grey fa fa-remove" ng-click="closeDocument()" title="Esc"></button>
        <button ng-click="printFile()" class="glyph grey fa fa-print" title="Print file"></button>
        <button ng-class="{'locked': document.locked}" ng-click="lockFile()" class="glyph grey unlocked fa fa-lock" title="Lock file"></button>
        <button ng-if="!document.locked" ng-click="removeDocument()" class="glyph grey red fa fa-trash" title="Delete file"></button>

        <div id="paper-buttons-extra">
            <div ng-if="document.doctype === 'invoices'">
                <span>Betaald</span><input class="" type="checkbox" value="1" ng-model="document.paid">
                <!--<span>PDF Engelstalig</span><input type="checkbox" value="1" ng-model="document.english">-->
                <!--<div ng-if="document.english">-->
                    <!--<span>Zonder BTW</span><input type="checkbox" value="1" ng-model="document.vat">-->
                <!--</div>-->
            </div>
            <div ng-if="!document.locked">
                <span>
                    Verberg total
                </span>
                <input type="checkbox" ng-model="document.hideTotal">
            </div>
            <div>
                <span>
                    BTW
                </span>
                <input type="text" ng-model="document.vat">
            </div>
        </div>
    </div>
</div>