<div class="panel detail">
    <div class="panel-body">
        <table class="detail" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td width="70px" class="label">
                    Naam
                </td>
                <td class="td-content">
                    <input title="Projectnaam" ng-model="model.name"><br><br> slug:<br>{{commonTools.toSlug(model.getNumber(), model.name)}}<br><br>
                </td>
            </tr>
            <tr>
                <td class="label">
                    Contact
                </td>
                <td class="td-content">
                    <input title="Contact" ng-model="model.contactPerson">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Adres
                </td>
                <td class="td-content">
                    <input title="Adres" ng-model="model.street">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Postcode
                </td>
                <td class="td-content">
                    <input title="Postcode" ng-model="model.zipcode">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Plaats
                </td>
                <td class="td-content">
                    <input title="Plaats" ng-model="model.city">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Uurtarief
                </td>
                <td class="td-content">
                    <input title="Uurtarief" class="input-small" ng-model="model.rate">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Telefoon
                </td>
                <td class="td-content">
                    <input title="Telefoon" ng-model="model.telephone">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Email
                </td>
                <td class="td-content">
                    <input title="Email" ng-model="model.email">
                </td>
            </tr>
            <tr>
                <td class="label">
                    www
                </td>
                <td class="td-content">
                    <input title="www" ng-model="model.web">
                </td>
            </tr>
        </table>
    </div>
    <div class="panel-footer panel-footer-remove">
        <button title="Verwijder contact" class="glyph red fa fa-trash" ng-click="removeContact()"></button>
    </div>
</div>