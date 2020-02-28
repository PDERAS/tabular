<template>
<div class="tabular-headers">
    <slot />
</div>
</template>

<script>
const orders = {
    asc: 'desc',
    desc: 'asc'
};
export default {
    provide() {
        return {
            activeSort: _ => this.activeSort,
            activeOrder: _ => this.activeOrder,
            updateActiveSort: val => {
                this.activeSort = val;
            }
        };
    },
    props: {
        defaultSort: {
            type: String,
            default: ''
        },
        defaultOrder: {
            type: String,
            default: 'asc',
            validator: val => Object.keys(orders).includes(val)
        }
    },
    data: _ => ({
        selectedSort: '',
        selectedOrder: '',
    }),
    computed: {
        activeSort: {
            get() {
                return this.selectedSort || this.defaultSort;
            },
            set(val) {
                if (this.activeSort !== val) {
                    // set selected col & reset order
                    this.selectedSort = val;
                    this.activeOrder = this.defaultOrder;
                } else {
                    // toggle order
                    this.activeOrder = orders[this.activeOrder];
                }

                // Every time the sortBy gets updated, expose the new data
                this.emitUpdates();
            }
        },
        activeOrder: {
            get() {
                return this.selectedOrder || this.defaultOrder;
            },
            set(val) {
                this.selectedOrder = val;
            }
        }
    },

    methods: {
        emitUpdates() {
            this.$emit('sort', {
                sortBy: this.activeSort,
                order: this.activeOrder
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.tabular-headers {
    display: grid;
    grid-template-columns: var(--table-column-size, repeat(5, 1fr));
    grid-gap: var(--table-gap-size, 1rem);
}
</style>
