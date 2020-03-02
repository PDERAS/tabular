/**
 * Component Loader function used to automatically load files
 * call it with a WebpackContext in order to automatically
 *
 * the first paramter for require.context is the relative path
 * for the folder to import.
 *
 * The second paramter is whether to recursively search folders or not
 *
 * The final paramter is the regex to match the correct files
 *
 * example:
 *   componentsLoader(require.context('./components', false, /\.vue$/i));
 *
 * @param {Object} modules webpackContext
 *
 * @return {Object}
*/
export const componentsLoader = modules => fileLoader(modules, componentReducer);

/**
 * When passed an array of loaded modules, it extracts the keys, and passes the result
 * to the supplied reducer
 *
 * usage:
 * modules: fileLoader(require.context('./modules', false, /\.js$/i), customReducer)
 *
 * @param {Object} files webpackContext
 * @param {Array} reducer reducer function to format the modules
 */
const fileLoader = (files, reducer) => {
    const [fn, start] = reducer(files);
    return files.keys().reduce(fn, start);
};

/**
 * Reduces loaded files into a flat array of objects.
 * Used with to autoload routes for Vue-Router
 *
 * @param {Object} context webpackContext
 *
 * @return {Array}
 */
const componentReducer = context => [
    // array to object reducer
    (acc, cur) => {
        acc[cur
            .split('/')
            .pop()
            .split('.')[0]] = context(cur).default;

        return acc;
    },

    // default reducer starting value
    {}
];
