<template>
<span v-if="!componentName" class="tabular-order-indicator">{{ activeOrder() }}</span>
<component :is="componentName" v-else v-bind="vBind" />
</template>

<script>
export default {
    inject: [
        'activeOrder'
    ],

    computed: {
        vBind() {
            if (typeof this.ComponentOverrideProps === 'function') {
                return this.ComponentOverrideProps({ order: this.activeOrder() });
            } else if (this.ComponentOverrideProps) {
                return this.ComponentOverrideProps;
            }

            return {};
        },

        /** Placeholder (Injected during component registration) */
        ComponentOverrideProps() { return null; }
    }
};
</script>
