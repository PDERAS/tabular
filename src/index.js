import { componentsLoader } from './utils';

export default {
    install(Vue, options = {}) {

        // Globally register table components
        Object.entries(componentsLoader(require.context('./components', false, /\.vue$/i)))
            .forEach(([name, component]) => {
                if (Object.keys(options.componentOverrides).includes(name)) {
                    const item = options.componentOverrides[name].component;
                    component.components = { [item.name]: item };
                    component.computed.ComponentOverrideProps = _ => props => options.componentOverrides[name].props(props);
                    component.computed.componentName = _ => item.name;
                }
                Vue.component(name, component);
            });
    }
};
