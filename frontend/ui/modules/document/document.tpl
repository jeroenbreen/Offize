<div id="paper-container">
    <div id="paper">
        <div id="paper-header">
            <img ng-src="frontend/assets/img/logo.png">
        </div>
        <div id="paper-info">
            <b>{{model.type}}</b> <input class="paper-year" ng-model="model.jaar"> - <input class="paper-nr" ng-model="model.nr">
            <br>
            <input class="paper-year" ng-model="model.datum.d">
            <select ng-model="model.datum.m"
                    ng-options="(months.indexOf(month) + 1) as month for month in months"></select>
            <input class="paper-year" ng-model="model.datum.j">
        </div>
        <div id="paper-contact">
            <div id="paper-contact-left">
                <input ng-model="model.klant.naam" class="input-bold">
                <input ng-model="model.klant.contact">
                <input ng-model="model.klant.adres">
                <input ng-model="model.klant.postcode">
            </div>
            <div id="paper-contact-right">
                <input class="input-bold" ng-model="model.bedrijf.naam">
                <input ng-model="model.bedrijf.contact">
                <input ng-model="model.bedrijf.adres">
                <input ng-model="model.bedrijf.postcode">
            </div>
        </div>
        <div id="paper-betreft">
            <b>Betreft:</b>
            <br>
            <input ng-model="model.omschrijving">
        </div>
        <div id="paper-werkzaamheden">
            <b>Werkzaamheden:</b>
            <br>
            <ul ui-sortable="sortableOptions" ng-model="model.posten">
                <li class="werkzaamheden-row animation-item-2" ng-repeat="post in model.posten" >
                    <div class="handle" title="posten herordenen">
                        <img src="frontend/assets/img/drag.png">
                    </div>
                    <div ng-if="post.type == 'uren'" class="werkzaamheden-cell">
                        <div class="werkzaamheden-row-c1">
                            <input placeholder="Post" ng-model="post.titel">
                        </div>
                        <div class="werkzaamheden-row-c2">
                            <input ng-model="post.uren">
                            x
                        </div>
                        <div class="werkzaamheden-row-c3">
                            <input ng-model="post.tarief">
                        </div>
                        <div class="werkzaamheden-row-c4">
                            {{post.uren * post.tarief}} {{model.currency}}
                        </div>
                        <button ng-click="removePost(post)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="post.type == 'bedrag'" class="werkzaamheden-cell">
                        <div class="werkzaamheden-row-c1">
                            <input placeholder="Post" ng-model="post.titel">
                        </div>
                        <div class="werkzaamheden-row-c2">
                            &nbsp;
                        </div>
                        <div class="werkzaamheden-row-c3">
                            &nbsp;
                        </div>
                        <div class="werkzaamheden-row-c4">
                            <input ng-model="post.bedrag">
                            {{model.currency}}
                        </div>
                        <button ng-click="removePost(post)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="post.type === 'kopje'" class="werkzaamheden-cell">
                        <input placeholder="Titel" ng-model="post.titel">
                        <button ng-click="removePost(post)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="post.type === 'text'" class="werkzaamheden-cell">
                        <input placeholder="Tekst" ng-model="post.content" class="longtext">
                        <button ng-click="removePost(post)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="post.type === 'enter'" class="enter werkzaamheden-cell">
                        <button ng-click="removePost(post)" class="glyph red remove-post">
                            d
                        </button>
                    </div>
                    <div ng-if="post.type === 'subtotal'" class="werkzaamheden-cell subtotal">
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
                            <button ng-click="removePost(post)" class="glyph red remove-post">
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
                <button title="rekenmodel toevoegen" class="glyph grey" ng-click="model.posten.push({type:'uren',titel:'',uren:0,tarief:model.rate})">
                    ,
                </button>
                <button title="vast bedrag toevoegen" class="glyph grey" ng-click="model.posten.push({type:'bedrag',titel:'',bedrag:0})">
                    E
                </button>
                <button title="subtotaal" class="glyph grey" ng-click="model.posten.push({type:'subtotal', titel:''})">
                    C
                </button>
                <button title="beschrijving toevoegen" class="glyph grey" ng-click="model.posten.push({type:'text', content:''})">
                    T
                </button>
                <button title="enter toevoegen" class="glyph grey" ng-click="model.posten.push({type:'enter'})">
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
                <span>Betaald</span><input class="" type="checkbox" value="1" ng-model="model.betaald">
                <span>PDF Engelstalig</span><input type="checkbox" value="1" ng-model="model.english">
                <div ng-if="model.english">
                    <span>Zonder BTW</span><input type="checkbox" value="1" ng-model="model.btw">
                </div>
            </div>
            <span>Verberg totaal</span><input type="checkbox" ng-model="model.hideTotal">
        </div>
    </div>
</div>