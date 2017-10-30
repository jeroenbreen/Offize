<select
    ng-model="current"
    ng-options="contact as contact.toSlug(20) for (index, contact) in contacts"
    title="Selecteer contact"></select>