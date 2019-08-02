<select
        ng-model="current"
        ng-options="contact as contact.toSlug(12) for (index, contact) in contacts"
        title="Selecteer contact"></select>