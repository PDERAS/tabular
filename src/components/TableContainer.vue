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
            draggable: _ => !!this.$attrs['drag'],
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
