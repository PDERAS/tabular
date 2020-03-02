<template>
<div
    class="tabular-header"
    :class="{ sortable: sortBy }"
    @click="selectHeader">
    <slot v-bind="sharedProps" />
    <slot
        v-if="sortBy && isActive"
        name="order"
        :active="isActive"
        :order="order">
        <TableOrderIndicator />
    </slot>
</div>
</template>

<script>
export default {
    inject: [
        'activeSort',
        'activeOrder',
        'updateActiveSort'
    ],

    provide() {
        return {
            parentActive: _ => this.isActive
        };
    },

    props: {
        sortBy: {
            type: String,
            default: ''
        }
    },

    computed: {
        isActive() {
            return this.sortBy && this.sortBy === this.activeSort();
        },

        order() {
            return this.activeOrder();
        },

        sharedProps() {
            return {
                active: this.isActive,
                order: this.order
            };
        }
    },

    methods: {
        selectHeader() {
            if (this.sortBy) {
                this.updateActiveSort(this.sortBy);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.sortable {
    cursor: pointer;
}
</style>
