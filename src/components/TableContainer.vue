<template>
<div class="tabular-container">
    <slot />
</div>
</template>

<script>
export default {
    provide() {
        return {
            userSuppliedData: _ => this.data,
            draggable: _ => !!this.$listeners['drag'],
            setData: arr => this.$emit('drag', arr)
        };
    },

    model: {
        prop: 'data',
        event: 'drag'
    },

    props: {
        data: {
            type: Array,
            required: true
        },
    },
};
</script>
<style scoped>
.tabular-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--table-gap-size, 1rem);
}
</style>
