<template>
<TableContainer :data="data">

    <!-- Set the default selected sort column, and order -->
    <!-- @sort provides the selected column, and order as parameters -->
    <TableHeaders default-sort="name" default-order="asc" @sort="searchData">

        <!-- 'Sortable' header -->
        <TableHeader sort="name">Name</TableHeader>

        <TableHeader sort="created_at">
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
        <template #row="{ row:thing, index }">
            <TableCell>
                {{ index }} - {{ thing.name }}
            </TableCell>

            <TableCell>
                {{ thing.created_at }}
            </TableCell>

            <TableCell>
                <FontAwesomeIcon icon="trash" />
            </TableCell>
        </template>
    </TableBody>

    <TableFooter>
        <!-- Not yet Implemented. TODO: accept laravel pagination object -->
        <TablePagination :pagination-data="paginationData" />
    </TableFooter>

</TableContainer>
</template>
