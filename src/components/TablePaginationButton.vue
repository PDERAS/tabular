<script>
export default {
    functional: true,
    render(h, { slots, listeners, data }) {
        const classes = [data.staticClass, data.class].filter(a => a).join(' ');
        // build the div
        return h('div', { class: classes, on: listeners }, slots().default );
    }
};
</script>
