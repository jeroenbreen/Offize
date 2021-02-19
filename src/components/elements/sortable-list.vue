<script>
    import { ContainerMixin } from 'vue-slicksort';

    export default {
        name: 'sortable-list',
        mixins: [ContainerMixin]
    }
</script>


<template>
    <ul class="list">
        <slot/>
    </ul>
</template>