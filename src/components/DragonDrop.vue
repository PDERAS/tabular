<script>
export default {
    props: {
        value: {
            type: Array,
            required: true
        },

        itemKey: {
            type: [String, Function],
            default: 'id'
        },

        tag: {
            type: String,
            default: 'span'
        },

        transition: {
            type: String,
            default: 'dragon-drop'
        },

        mode: {
            type: String,
            default: 'swap'
        }
    },

    methods: {

        // we derive the key by attempting to find it using the supplied 'itemKey'
        // if that is not found, we use the entire item as a key
        keyFn(item) {
            if (this.value.length && this.value[0] && this.value[0][this.itemKey]) {
                if (typeof(this.itemKey) === 'string') {
                    return item[this.itemKey];
                }

                return this.itemKey(item);
            } else {
                return item;
            }
        },

        // the drop handler
        drop(i, e) {
            e.preventDefault();
            // restore grabbed key
            const y = JSON.parse(e.dataTransfer.getData('text'));

            // copy array & swap elements
            const newArr = [ ...this.value ];
            const index = newArr.indexOf(newArr.find(j => this.keyFn(j) === y));
            const index2 = newArr.indexOf(newArr.find(j => this.keyFn(j) === this.keyFn(i)));
            const rows = [newArr[Math.min(index, index2)], newArr[Math.max(index, index2)]];

            if (this.mode === 'swap') {
                newArr.splice(Math.min(index, index2), 1, rows[1]);
                newArr.splice(Math.max(index, index2), 1, rows[0]);
            } else if (this.mode === 'insert') {
                let row = newArr[index];
                newArr.splice(index, 1);
                newArr.splice(index2, 0, row);
            }

            // emit update
            this.$emit('input', newArr);
            this.$emit('drag-end', { item: i });
        },

        dragStart(i, e) {
            e.dataTransfer.setData('text', JSON.stringify(this.keyFn(i)));
            this.$emit('drag-start', { item: i });
        },

        dragOver(e) {
            e.preventDefault();

        }
    },
    render(h) {
        return h('transition-group', {attrs: { name: this.transition, tag: this.tag } }, [
            ...this.value.flatMap((item, index) => {
                // pre-compile the slot
                // line breaks are action text nodes, so we will filter them out
                // before proceeding
                const slots = this.$slots.default({ item, index })
                    .filter(t => t.tag || t.data || t.children || t.text !== ' ');

                // key generation
                const key = this.keyFn(item);

                // default dragon events. these are native html events
                // which are first processed and emit the matching
                // vue.js event
                const dragonEvents = {
                    drop: e => this.drop(item, e),
                    dragover: this.dragOver,
                    dragstart: e => this.dragStart(item, e)
                };

                // if the tag exists we can inject the event listeners & handlers
                // if no tag exists, we assume its raw text and we wrap with a
                // div so that we can add our events/handlers
                return slots.map((slot, keyIdx) => {
                    // If the slot has a tag (div,span,h1 etc) we will use that as the base component
                    // for our renderless drag logic. if there is no tag present, we will need to
                    // inject a div into the mix so that we can add event listeners
                    return slot.tag
                        ? {
                            // copy all of the previously existing items
                            // we will only need to update a few key items
                            ...slot,
                            // We will need to generate unique keys for each if the items
                            // in the array. since then all are belonging to the same parent
                            // our key selector is no longer unique here (item.id would be)
                            // the same for every item), so in addition to the key, we are
                            // adding on the index
                            key: `${key}_${keyIdx}`,

                            // We will inject event listeners & dom attributes here
                            data: {
                                // First copy all previous data
                                ...slot.data,

                                // Event Listeners
                                on: {
                                    // Re-use all existing event listeners
                                    ...slot.data && slot.data.on,

                                    // Inject the 'dragon-drop' event listeners
                                    ...dragonEvents
                                },
                                attrs: {
                                    // Attach any dom attributes, or other items attached
                                    ...slot.data && slot.data.attrs,

                                    // Force set draggable to true
                                    draggable: true
                                }
                            }
                        }
                        : [h('div', { // we need to wrap raw text with a div so that we can attach event listeners etc.
                            key: `${key}_${keyIdx}`, // generate the unique key
                            on: dragonEvents, // add event listeners
                            attrs: { draggable: true }, // attach draggable attribute
                        }, slot.text)]; // add raw text as child
                });
            })
        ]);
    }
};
</script>