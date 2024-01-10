<template>
    <div :class="computedClasses">
        <slot></slot>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,

    computed: {
        computedClasses() {
            // Combining the classes from props
            return [this.$attrs.class, this.$attrs.staticClass].filter(Boolean).join(' ');
        }
    }
};
</script>