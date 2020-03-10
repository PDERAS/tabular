<template>
<DragonDrop
    v-if="isDraggable"
    v-slot="{ item, index }"
    tag="div"
    :item-key="keySelector"
    class="tabular-body"
    :value="getData"
    @input="setData">
    <div class="tabular-row">
        <slot
            :index="index"
            :row="item"
            name="row" />
    </div>
</DragonDrop>

<div v-else class="tabular-body">
    <div
        v-for="(item, idx) in getData"
        :key="getKey(item)"
        class="tabular-row">
        <slot
            :index="idx"
            :row="item"
            name="row" />
    </div>
</div>
</template>

<script>
import { DragonDrop } from '@pderas/dragon-drop';

export default {
    inject: [
        'userSuppliedData',
        'draggable',
        'setData'
    ],

    components: {
        DragonDrop
    },

    props: {
        keySelector: {
            type: [String, Function],
            default: 'id'
        }
    },

    computed: {
        getData() {
            return this.userSuppliedData();
        },

        isDraggable() {
            return this.draggable();
        }
    },

    methods: {
        getKey(item) {
            if (typeof(this.keySelector) === 'string') {
                return item[this.keySelector];
            }

            return this.keySelector(item);
        }
    }
};
</script>

<style lang="scss" scoped>
.tabular-body {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--table-gap-size, 1rem);
}

.tabular-row {
    display: grid;
    grid-template-columns: var(--table-column-size, repeat(5, 1fr));
    grid-gap: var(--table-gap-size, 1rem);
}
</style>
