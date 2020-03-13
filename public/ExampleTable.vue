<template>
<TableContainer :data="data" class="example-table">
    <!-- Set the default selected sort column, and order -->
    <!-- @sort provides the selected column, and order as parameters -->
    <TableHeaders default-sort="name" default-order="asc" @sort="sortData">

        <!-- 'Sortable' header -->
        <TableHeader sort-by="name">Name</TableHeader>

        <TableHeader sort-by="created_at">
            <!-- Override the order indicator & default slot -->
            <!-- both default & order slots provide 'active', and 'order' props -->
            <template #default="{ active }">Created Date{{ active ? ' - Selected' : '' }}</template>
            <template #order="{ order }"> - {{ order === 'asc' ? 'Up' : 'Down' }}</template>
        </TableHeader>

        <!-- Basic Header, no interactions -->
        <TableHeader>Actions</TableHeader>
    </TableHeaders>

    <TableBody>
        <!-- Use a template to define the layout of each row -->
        <template #row="{ row:thing, index }">
            <TableCell>
                {{ index }} - {{ thing.name }}
            </TableCell>

            <TableCell>
                {{ thing.created_at }}
            </TableCell>

            <TableCell>
                <button @click="remove(thing)">Delete</button>
            </TableCell>
        </template>
    </TableBody>

    <TableFooter>
        <!-- Each pagination button is provided by an optional slot -->
        <TablePagination :data="paginationData" @paginate="updatePage">

            <template #first>First</template>

            <template #previous>Previous</template>

            <!-- Loops through surrounding page numbers, exposing each as a scopedSlot -->
            <!-- Adjust the number of pages on each side of current by providing :offset="2" to TablePagination -->
            <template #numbers="{ page }">{{ page }}</template>

            <template #next>Next</template>

            <template #last>Last</template>
        </TablePagination>
    </TableFooter>

</TableContainer>
</template>

<script>
export default {
    data() {
        return {
            data: this.fakeData(),

            paginationData: {
                current_page: 1,
                last_page: 10
            }
        };
    },

    methods: {
        fakeData() {
            return new Array(15)
                .fill()
                .map((a, i) => ({ id: i + 1, name: Math.random().toString(36).substring(7), created_at: new Date().toLocaleDateString() }));
        },
        sortData({ sortBy, order }) {
            this.data = [...this.data].sort((a,b) => {
                return a[sortBy] > b[sortBy]
                    ? order === 'asc' ? 1 : -1
                    :  order === 'asc' ? -1 : 1;
            });
        },

        updatePage({ page }) {
            // Fake pagination results from server
            this.paginationData.current_page = page;

            // make your ajax call for the provided page number
            this.data = this.fakeData();
        },

        remove(thing) {
            this.data = this.data.filter(a => a.id !== thing.id);
        }
    }
};
</script>

<style lang="scss">
.example-table {
   --table-column-size: repeat(3, 1fr);
   border: 1px solid;
   padding: 2rem;

   .tabular-headers {
       border-bottom: 2px solid;
       padding-bottom: .5rem;
   }
   .tabular-pagination-row {
       display: flex;
    justify-content: center;
   }

   .tabular-pagination-button {
       padding: 1rem;
       border: 1px solid;
       cursor: pointer;
       &.active {
           background: lightblue;
       }
   }
}
</style>
