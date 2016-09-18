<div id="paper-container">
    <div id="paper">
        <div id="paper-header">
            <img ng-src="frontend/assets/img/logo.png">
        </div>
        <div id="paper-info">
            <b>{{model.getPrefix()}}</b>
            <input class="paper-year" ng-model="model.year"> -
            <input class="paper-nr" ng-model="model.nr">
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
        <div id="paper-betreft">
            <b>Betreft:</b>
            <br>
            <input ng-model="model.title">
        </div>
        <div id="paper-werkzaamheden">
            <b>Werkzaamheden:</b>
            <br>
            <ul ui-sortable="sortableOptions" ng-model="model.lines">
                <li class="werkzaamheden-row animation-item-2" ng-repeat="line in model.lines" >
                    <div class="handle" title="posten herordenen">
                        <img src="frontend/assets/img/drag.png">
                    </div>
                    <div ng-if="line.type === 'count'" class="werkzaamheden-cell">
                        <div class="werkzaamheden-row-c1">
                            <input placeholder="Post" ng-model="line.title">
                        </div>
                        <div class="werkzaamheden-row-c2">
                            <input ng-model="line.hours">
                            x
                        </div>
                        <div class="werkzaamheden-row-c3">
                            <input ng-model="line.rate">
                        </div>
                        <div class="werkzaamheden-row-c4">
                            {{line.hours * line.rate}} {{model.currency}}
                        </div>
                        <button ng-click="removeLine(line)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="line.type === 'amount'" class="werkzaamheden-cell">
                        <div class="werkzaamheden-row-c1">
                            <input placeholder="Post" ng-model="line.title">
                        </div>
                        <div class="werkzaamheden-row-c2">
                            &nbsp;
                        </div>
                        <div class="werkzaamheden-row-c3">
                            &nbsp;
                        </div>
                        <div class="werkzaamheden-row-c4">
                            <input ng-model="line.amount">
                            {{model.currency}}
                        </div>
                        <button ng-click="removeLine(line)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="line.type === 'text'" class="werkzaamheden-cell">
                        <input placeholder="Titel" ng-model="line.text">
                        <button ng-click="removeLine(line)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="line.type === 'enter'" class="enter werkzaamheden-cell">
                        <button ng-click="removeLine(line)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="line.type === 'subtotal'" class="werkzaamheden-cell subtotal">
                        <div class="subtotal-1">
                            <div class="werkzaamheden-row-c1">
                                <b>Subtotaal</b>
                            </div>
                            <div class="werkzaamheden-row-c2">
                                &nbsp;
                            </div>
                            <div class="werkzaamheden-row-c3">
                                &nbsp;
                            </div>
                            <div class="werkzaamheden-row-c4 subtotal-total">
                                <b>{{getSubTotal($index, 1) | number:2}} {{model.currency}}</b>
                            </div>
                            <button ng-click="removeLine(line)" class="glyph red remove-post">
                                d
                            </button>
                        </div>
                        <div class="subtotal-2">
                            <div class="werkzaamheden-row-c1">
                                BTW 21%
                            </div>
                            <div class="werkzaamheden-row-c2">
                                &nbsp;
                            </div>
                            <div class="werkzaamheden-row-c3">
                                &nbsp;
                            </div>
                            <div class="werkzaamheden-row-c4">
                                {{getSubTotal($index, 0.21) | number:2}} {{model.currency}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div id="werkzaamheden-nieuw">
                <button title="rekenmodel toevoegen" class="glyph grey" ng-click="model.addLine('count')">
                    ,
                </button>
                <button title="vast bedrag toevoegen" class="glyph grey" ng-click="model.addLine('amount')">
                    E
                </button>
                <button title="subtotaal" class="glyph grey" ng-click="model.addLine('subtotal')">
                    C
                </button>
                <button title="beschrijving toevoegen" class="glyph grey" ng-click="model.addLine('text')">
                    T
                </button>
                <button title="enter toevoegen" class="glyph grey" ng-click="model.addLine('enter')">
                    B
                </button>
            </div>
            <div id="werkzaamheden-totaal" ng-if="!model.hideTotal">
                <span class="left">Totaal</span><span class="right">{{getTotal(1) | number:2}} <input class="paper-nr" ng-model="model.currency"></span>
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
        <button class="glyph grey" ng-click="closeDocument()" title="Esc">
            x
        </button>
        <button ng-click="printFile()" class="glyph grey" title="Print file">
            p
        </button>
        <button ng-class="{'locked': model.lock}" ng-click="lockFile()" class="glyph grey unlocked" title="Lock file">
            l
        </button>
        <button ng-if="!model.lock" ng-click="removeFile()" class="glyph grey red" title="Delete file">
            d
        </button>
        <div id="paper-buttons-extra">
            <div ng-if="model.type == 'Factuur'">
                <span>Betaald</span><input class="" type="checkbox" value="1" ng-model="model.paid">
                <span>PDF Engelstalig</span><input type="checkbox" value="1" ng-model="model.english">
                <div ng-if="model.english">
                    <span>Zonder BTW</span><input type="checkbox" value="1" ng-model="model.btw">
                </div>
            </div>
            <span>Verberg totaal</span><input type="checkbox" ng-model="model.hideTotal">
        </div>
    </div>
</div>