<div class="subtotal-1">
    <div class="lines-row-c1">
        <b>Subtotaal</b>
    </div>
    <div class="lines-row-c2">
        &nbsp;
    </div>
    <div class="lines-row-c3">
        &nbsp;
    </div>
    <div class="lines-row-c4 subtotal-total">
        <b>{{getSubTotal(index, 1) | number:2}} {{model.currency}}</b>
    </div>
</div>

<div class="subtotal-2">
    <div class="lines-row-c1">
        BTW 21%
    </div>
    <div class="lines-row-c2">
        &nbsp;
    </div>
    <div class="lines-row-c3">
        &nbsp;
    </div>
    <div class="lines-row-c4">
        {{getSubTotal(index, 0.21) | number:2}} {{model.currency}}
    </div>
</div>