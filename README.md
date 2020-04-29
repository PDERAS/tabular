# Tabular

> Tab"u*lar (?),
>
> a. [L. tabularis, fr. tabula a board, table. See Table.]
>
> Having the form of, or pertaining to, a table (in any of the uses of the word).

## Installation

`npm i @pderas/tabular`

```js
import PderasTable from '@pderas/tabular';
Vue.use(PderasTable);
```

> More advanced usage can be used to override the default sortBy order indication
```js
// get the desired component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import PderasTable from '@pderas/tabular';

Vue.use(PderasTable, {
    // Override the builtin components
    componentOverrides: {
        // Specifically the TableOrderIndicator component
        TableOrderIndicator: {
            // replace with FontAwesomeIcon
            component: FontAwesomeIcon,
            // props will receive the current order as a parameter
            props: ({ order }) => ({
                // icon is a required prop for FontAwesomeIcon
                icon: order === 'asc' ? 'sort-amount-down' : 'sort-amount-up'
            })
        }
    }
});
```


## Example Usage

```vue
<template>
<TableContainer :data="data">

    <!-- Simplest Useful Table -->
    <TableHeaders>
        <TableHeader>Name</TableHeader>
        <TableHeader>Created At</TableHeader>
        <TableHeader>Actions</TableHeader>
    </TableHeaders>

    <TableBody>
        <template #row="{ row:item }">
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>{{ item.created_at }}</TableCell>
            <TableCell><FontAwesomeIcon icon="trash" /></TableCell>
        </template>
    </TableBody>

</TableContainer>
</template>
```

```vue
<template>
<TableContainer :data="tableData">

    <!-- Set the default selected sort column, and order -->
    <!-- @sort provides the selected column, and order as parameters -->
    <TableHeaders default-sort="name" default-order="asc" @sort="sortData">

        <TableHeader>Index</TableHeader>

        <!-- 'Sortable' header -->
        <TableHeader sort-by="name">Name</TableHeader>

        <TableHeader sort-by="created_at">
            <!-- Override the order indicator & default slot -->
            <!-- both default & order slots provide 'active', and 'order' props -->
            <template #default="{ active, order }">Created Date - {{ order }} - {{ active }}</template>
            <template #order="{ order }">{{ order === 'asc' ? 'Up' : 'Down' }}</template>
        </TableHeader>

        <!-- Basic Header, no interactions -->
        <TableHeader>Actions</TableHeader>
    </TableHeaders>

    <TableBody>
        <!-- Use a template to define the layout of each row -->
        <template #row="{ row:item, index }">
            <TableCell>{{ index }}</TableCell>
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>{{ item.created_at }}</TableCell>
            <TableCell><FontAwesomeIcon icon="trash" /></TableCell>
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
    data: _ => ({
        tableData: [/* Array of all your data */],

        paginationData: {
            current_page: 4,
            last_page: 13
        }
    }),

    methods: {
        sortData({ sortBy, order }) {
            // make your ajax call, sorting and ordering.
        },

        updatePage({ page }) {
            // make your ajax call for the provided page number
        }
    }
}
</script>

<style lang="scss">
.tabular {
    &-container {
        /* Row Sizing Definition */
        /* Gets passed to grid-template-columns */
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns */
        --table-column-size: repeat(2, 100px) minmax(400px, 50%) 1fr;

        /* gap between cells */
        --table-gap-size: 0rem;
    }

    &-headers {
        /* Apply background/text styling to the headers */
        @apply bg-primary text-white font-bold p-4;
    }

    &-row {
        /* basic table body styles */
        @apply bg-white px-4 py-2;

        &:nth-child(odd) {
            @apply bg-primary-100;
        }
    }

    /* Pagination button styles */
    &-pagination {
        &-row {
            @apply flex items-center justify-center mt-4;
        }

        &-button {
            @apply bg-white h-8 border border-gray-200 flex items-center justify-center shadow-md cursor-pointer mx-2;
            min-width: 4rem;

            &:hover,
            &.active {
                @apply bg-primary-100;
            }
        }

    }
}
</style>
```
