<input
    ng-if="!document.locked"
    ng-model="line.text"
    placeholder="Titel">

<div
    ng-if="document.locked">
    {{line.text}}
</div>