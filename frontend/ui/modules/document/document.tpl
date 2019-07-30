<div class="overlay">
    <div
        ng-class="{'locked-file': document.locked}"
        class="popup__container">

        <div
            class="paper"
            ng-style="{
                'width': getSize(template.paper.width),
                'height': getSize(template.paper.height),
                'padding': getSize(template.paper.padding),
                'font-size': getSize(template.paper.fontSize)
            }">

            <div class="paper__container">
                <div class="paper__header">
                    <img
                        ng-style="{ 'height': getSize(template.logo.height)}"
                        ng-src="{{office.company.logoUrl}}">
                </div>

                <document-info
                        document="document"
                        template="template"
                        get-size="getSize"
                        scale="scale"></document-info>

                <document-addresses
                        document="document"
                        template="template"
                        get-size="getSize"
                        scale="scale"></document-addresses>

                <div
                    ng-style="{
                        'top': getSize(template.title.top),
                        'height': getSize(template.title.height),
                        'padding': getSize(template.title.padding)
                    }"
                    class="document__title">
                    <b>Betreft:</b>&nbsp;
                    <input ng-if="!document.locked" ng-model="document.title" ng-change="updateDocument()">
                    <div ng-if="document.locked">
                        {{document.title}}
                    </div>
                </div>

                <div
                    ng-style="{
                        'top': getSize(template.lines.top),
                        'padding': getSize(template.lines.padding)
                    }"
                    class="document__lines">
                    <ul ui-sortable="sortableOptions" ng-model="document.lines">
                        <li class="lines-row animation-item-2" ng-repeat="line in document.lines" ng-click="selectLine(line)" ng-class="{'current-line' : line === currentLine}">
                            <line line="line" ofc-document="document"></line>
                        </li>
                    </ul>

                    <line-tools
                            ng-if="!document.locked"
                            document="document"></line-tools>

                </div>

                <div
                        ng-if="!document.hideTotal"
                        ng-style="{
                        'top': getSize(template.total.top),
                        'padding': getSize(template.total.padding)
                    }"
                        class="document__total" >
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

                <div
                    ng-style="{
                        'top': getSize(template.footer.top)
                    }"
                    class="document__footer">
                    <div
                        ng-if="document.doctype === 'invoice'"
                        ng-style="{
                            'padding': getSize(template.footer.invoiceText.padding),
                            'font-size': getSize(template.footer.invoiceText.fontSize)
                        }"
                        class="document__invoice-text">
                        {{office.company.invoiceText}}
                    </div>

                    <img
                        ng-style="{
                            'width': getSize(template.footer.image.width),
                            'margin-top': getSize(template.footer.image.marginTop)
                        }"
                        ng-src="{{office.company.footerImageUrl}}">
                </div>

                <div
                    ng-style="{
                        'top': getSize(template.legal.top),
                        'font-size': getSize(template.legal.fontSize)
                    }"
                    class="document__legal">
                    {{office.company.name}} | KvK {{office.company.coc}} | BTW {{office.company.vat}}
                </div>
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