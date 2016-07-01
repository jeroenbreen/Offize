<div class="panel">
    <div class="panel-body">
        <table class="detail" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td width="70px" class="label">
                    Naam
                </td>
                <td>
                    <input title="Projectnaam" ng-model="model.name">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Contact
                </td>
                <td>
                    <input title="Contact" ng-model="model.contactPerson">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Adres
                </td>
                <td>
                    <input title="Adres" ng-model="model.street">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Postcode
                </td>
                <td>
                    <input title="Postcode" ng-model="model.zipcode">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Plaats
                </td>
                <td>
                    <input title="Plaats" ng-model="model.city">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Uurtarief
                </td>
                <td>
                    <input title="Uurtarief" ng-model="model.rate">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Telefoon
                </td>
                <td>
                    <input title="Telefoon" ng-model="model.telephone">
                </td>
            </tr>
            <tr>
                <td class="label">
                    Email
                </td>
                <td>
                    <input title="Email" ng-model="model.email">
                </td>
            </tr>
            <tr>
                <td class="label">
                    www
                </td>
                <td>
                    <input title="www" ng-model="model.web">
                </td>
            </tr>
        </table>
    </div>
    <div class="panel-footer panel-footer-remove">
        <button title="Verwijder contact" class="glyph red" ng-click="removeContact()">d</button>
    </div>
</div>