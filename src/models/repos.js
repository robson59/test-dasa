import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/repos';

export default {
  namespace: 'repos',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Get a list from the API
     * @returns {Promise}
     * @param {number} page
     * @param term
     */
    async fetchList({ page = 1, term = '' }) {
      try {
        if (!term) {
          return dispatch.repos.replace({ ...{}, page });
        }

        const response = await Api.get(`/search/repositories?q=${term}&per_page=5&page=${page}`);
        const { data } = response;

        return !data || data.length < 1
          ? true
          : dispatch.repos.replace({ data, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },
  }),

  /**
   * Reducers
   */
  reducers: {
    /**
     * Replace list in store
     * @param {obj} state
     * @param {obj} payload
     */
    replace(state, payload) {
      const { data, page } = payload;

      return data?.total_count > 0 ? {
        listFlat: page === 1 ? data?.items : state.listFlat.concat(data?.items),
        meta: {
          page,
          total: parseInt(data?.total_count, 10) || null,
        },
      }
        : initialState;
    },
  },
};
