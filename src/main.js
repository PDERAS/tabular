const components = import.meta.glob('@/components/*.vue', { eager: true });

export default {
    install: (app, options) => {
        Object.entries(components).forEach(([path, component]) => {
            const name = path.split('/').pop().replace(/\.\w+$/, '');

            // Create a new component configuration based on the original
            const componentConfig = { ...component.default };

            if (Object.keys(options.componentOverrides).includes(name)) {
                const item = options.componentOverrides[name].component;

                // Extend the new component configuration
                componentConfig.components = { [item.name]: item };
                componentConfig.computed = {
                    ...componentConfig.computed,
                    ComponentOverrideProps: _ => props => options.componentOverrides[name].props(props),
                    componentName: _ => item.name,
                };
            }

            // Register the extended component configuration
            app.component(name, componentConfig);
        });
    }
}