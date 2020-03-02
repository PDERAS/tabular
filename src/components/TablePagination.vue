<template>
<div class="tabular-pagination-row">
    <TablePaginationButton
        v-if="$slots.first"
        class="tabular-pagination-first tabular-pagination-button"
        @click="firstPage">
        <slot name="first">First</slot>
    </TablePaginationButton>
    <TablePaginationButton
        v-if="$slots.previous"
        class="tabular-pagination-previous tabular-pagination-button"
        @click="previousPage">
        <slot name="previous">Previous</slot>
    </TablePaginationButton>

    <template v-if="$scopedSlots.numbers">
        <TablePaginationButton
            v-for="page in paginationRange"
            :key="page"
            class="tabular-pagination-numbers tabular-pagination-button"
            :class="page === data.current_page && 'active'"
            @click="goToPage(page)">
            <slot name="numbers" :page="page">{{ page }}</slot>
        </TablePaginationButton>
    </template>

    <TablePaginationButton
        v-if="$slots.next"
        class="tabular-pagination-next tabular-pagination-button"
        @click="nextPage">
        <slot name="next">Next</slot>
    </TablePaginationButton>
    <TablePaginationButton
        v-if="$slots.last"
        class="tabular-pagination-last tabular-pagination-button"
        @click="lastPage">
        <slot name="last">Last</slot>
    </TablePaginationButton>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
            validator: val => ['current_page', 'last_page'].every(key => Object.keys(val).includes(key))
        },

        offset: {
            type: Number,
            default: 1
        },
    },

    computed: {
        paginationRange() {
            let start = this.data.current_page - this.offset;
            let end = this.data.current_page + this.offset;

            if (start < 1) {
                // offset to the end so that we get for example
                // [1] 2  3
                //  1 [2] 3
                //  2 [3] 4
                end = Math.min(this.data.last_page, end + 1 - start);
                start = Math.max(1, start + (1 - start));
            }

            if (end > this.data.last_page) {
                // offset to the end so that we get for example
                // 3  4 [5]
                // 3 [4] 5
                // 2 [3] 4
                start = Math.max(1, start + (this.data.last_page - end));
                end = Math.min(this.data.last_page, end);
            }

            return new Array(end - start + 1).fill().map((_,i) => i + start);
        }
    },

    methods: {
        nextPage() {
            this.goToPage(Math.min(this.data.current_page + 1, this.data.last_page));
        },

        previousPage() {
            this.goToPage(Math.max(this.data.current_page - 1, 1));
        },

        lastPage() {
            this.goToPage(this.data.last_page);
        },

        firstPage() {
            this.goToPage(1);
        },

        goToPage(page) {
            if (page !== this.data.current_page) {
                this.$emit('paginate', { page });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.tabular-pagination-row {
    display: flex;
}
</style>
