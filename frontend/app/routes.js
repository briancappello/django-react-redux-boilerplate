// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Blog/reducer'),
          import('containers/Blog/sagas'),
          import('containers/Categorization/reducer'),
          import('containers/Categorization/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          blogReducer,
          blogSagas,
          categorizationReducer,
          categorizationSagas,
          component,
        ]) => {
          injectReducer('blog', blogReducer.default);
          injectSagas(blogSagas.default);

          injectReducer('categorization', categorizationReducer.default)
          injectSagas(categorizationSagas.default)

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Auth/LoginPage'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/posts/:slug',
      name: 'post-detail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Blog/reducer'),
          import('containers/Blog/sagas'),
          import('containers/Blog/PostPage'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([blogReducer, blogSagas, component]) => {
          injectReducer('blog', blogReducer.default)
          injectSagas(blogSagas.default)

          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    }, {
      path: '/posts/categories/:slug',
      name: 'post-category-detail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Blog/reducer'),
          import('containers/Blog/sagas'),
          import('containers/Categorization/reducer'),
          import('containers/Categorization/sagas'),
          import('containers/Blog/CategoryPosts'),
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([
          blogReducer,
          blogSagas,
          categorizationReducer,
          categorizationSagas,
          component,
        ]) => {
          injectReducer('blog', blogReducer.default)
          injectSagas(blogSagas.default)

          injectReducer('categorization', categorizationReducer.default)
          injectSagas(categorizationSagas.default)

          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
