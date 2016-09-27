<div id="paper-container">
    <div id="paper">
        <div id="paper-header">
            <img ng-src="frontend/assets/img/logo.png">
        </div>

        <div id="paper-info">
            <b>{{model.getPrefix()}}</b>
            <input class="paper-year input-bold" ng-model="model.year"> -
            <input class="paper-nr input-bold" ng-model="model.nr">
            <br>
            <input class="paper-year" ng-model="model.date.d">
            <select ng-model="model.date.m"
                    ng-options="(months.indexOf(month) + 1) as month for month in months"></select>
            <input class="paper-year" ng-model="model.date.j">
        </div>

        <div id="paper-contact">
            <div id="paper-contact-left">
                <input ng-model="model.client.naam" class="input-bold">
                <input ng-model="model.client.contact">
                <input ng-model="model.client.adres">
                <input ng-model="model.client.postcode">
            </div>
            <div id="paper-contact-right">
                <input class="input-bold" ng-model="model.sender.naam">
                <input ng-model="model.sender.contact">
                <input ng-model="model.sender.adres">
                <input ng-model="model.sender.postcode">
            </div>
        </div>

        <div id="paper-title">
            <b>Betreft:</b>
            <br>
            <input ng-model="model.title">
        </div>

        <div id="paper-lines">
            <b>Werkzaamheden:</b>
            <br>
            <ul ui-sortable="sortableOptions" ng-model="model.lines">
                <li class="lines-row animation-item-2" ng-repeat="line in model.lines" >
                    <div class="handle" title="posten herordenen">
                        <img src="frontend/assets/img/drag.png">
                    </div>

                    <ofc-count ofc-model="line" ng-if="line.type === 'count'" class="lines-cell">
                    </ofc-count>
                    <ofc-amount ofc-model="line" ng-if="line.type === 'amount'" class="lines-cell">
                    </ofc-amount>
                    <ofc-text ofc-model="line" ng-if="line.type === 'text'" class="lines-cell"></ofc-text>
                    <ofc-enter ng-if="line.type === 'enter'" class="lines-cell">
                    </ofc-enter>
                    <ofc-subtotal ofc-model="model" ofc-index="$index" ng-if="line.type === 'subtotal'" class="lines-cell subtotal"></ofc-subtotal>
                    <button ng-click="removeLine(line)" class="glyph red remove-post fa fa-trash"></button>
                </li>
            </ul>

            <div id="lines-new">
                <button title="rekenmodel toevoegen" class="glyph grey fa fa-ellipsis-h" ng-click="model.addLine('count')"></button>
                <button title="vast bedrag toevoegen" class="glyph grey fa fa-eur" ng-click="model.addLine('amount')"></button>
                <button title="subtotal" class="glyph grey fa fa-calculator" ng-click="model.addLine('subtotal')"></button>
                <button title="beschrijving toevoegen" class="glyph grey fa fa-align-left" ng-click="model.addLine('text')"></button>
                <button title="enter toevoegen" class="glyph grey fa fa-paragraph" ng-click="model.addLine('enter')"></button>
            </div>

            <div id="lines-total" ng-if="!model.hideTotal">
                <span class="left">Totaal</span><span class="right">{{getTotal(1) | number:2}} {{model.currency}}</span>
                <br>
                <div ng-if="!model.btw">
                    <span class="left">BTW 21%</span><span class="right">{{getTotal(0.21) | number:2}} {{model.currency}}</span>
                    <span class="left"><b>Te betalen</b></span><span class="right"><b>{{getTotal(1.21) | number:2}} {{model.currency}}</b></span>
                </div>
            </div>

            <div id="dollar-warning" ng-if="model.english">
                <b>Let op: engels is aangevinkt.</b><br><br>
                Het kan zijn dat deze factuur/offerte op een andere manier boekhoudkundig (oa BTW aangifte) moet worden verwerkt, dan dat de getoonde vormgeving doet vermoeden!
            </div>
        </div>
    </div>

    <div id="paper-buttons">
        <button class="glyph grey fa fa-remove" ng-click="closeDocument()" title="Esc"></button>
        <button ng-click="printFile()" class="glyph grey fa fa-print" title="Print file"></button>
        <button ng-class="{'locked': model.lock}" ng-click="lockFile()" class="glyph grey unlocked fa fa-lock" title="Lock file"></button>
        <button ng-if="!model.lock" ng-click="removeFile()" class="glyph grey red fa fa-trash" title="Delete file"></button>
        <div id="paper-buttons-extra">
            <div ng-if="model.type == 'Factuur'">
                <span>Betaald</span><input class="" type="checkbox" value="1" ng-model="model.paid">
                <span>PDF Engelstalig</span><input type="checkbox" value="1" ng-model="model.english">
                <div ng-if="model.english">
                    <span>Zonder BTW</span><input type="checkbox" value="1" ng-model="model.btw">
                </div>
            </div>
            <span>Verberg total</span><input type="checkbox" ng-model="model.hideTotal">
        </div>
    </div>
</div>