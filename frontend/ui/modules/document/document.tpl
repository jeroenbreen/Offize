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


                    <div
                            ng-click="addLine('count')"
                            class="document-tool"
                            title="rekenmodel toevoegen">
                        <i class="fa fa-ellipsis-h"></i>
                    </div>
                    <div
                            ng-click="addLine('amount')"
                            class="document-tool"
                            title="vast bedrag toevoegen">
                        <i class="fa fa-euro-sign"></i>
                    </div>
                    <div
                            ng-click="addLine('subtotal')"
                            class="document-tool"
                            title="subtotal">
                        <i class="fa fa-calculator"></i>
                    </div>
                    <div
                            ng-click="addLine('text')"
                            class="document-tool"
                            title="beschrijving toevoegen">
                        <i class="fa fa-align-left"></i>
                    </div>
                    <div
                            ng-click="addLine('enter')"
                            class="document-tool"
                            title="enter toevoegen">
                        <i class="fa fa-paragraph"></i>
                    </div>
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

        <document-tools
                project="project"
                document="document"></document-tools>

    </div>

    <div
            ng-click="closeDocument()"
            class="popup__close">
    </div>
</div>