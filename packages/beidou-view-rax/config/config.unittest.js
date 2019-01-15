'use strict';

module.exports = () => ({
  view: {
    cache: false,
  },
  router: {
    /**
     * root directory for auto match route
     * include server route and webpack entry
     * @member {String} Config#root
     * @since 1.0.0
     */
    root: '/',

    urlPrefix: '/',

    /**
     * files or directories should be ignored
     * when automatically match route
     * @member {String} Config#exclude glob pattern
     * @since 1.0.0
     */
    exclude: '_*',

    /**
     * define custom mapping files to router
     *
     * {
     *  user: {
     *    profile: 'get',
     *    create: 'post',
     *  }
     * }
     */
    mapping: null,

    /**
     * if entry defined, router only works when name of files match `entry`.
     */
    entry: null,
  },
  isomorphic: {},
});
