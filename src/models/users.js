import Api from '../lib/api';
import HandleErrorMessage from '../lib/format-error-messages';
import initialState from '../store/users';
import { errorMessages } from '../constants/messages';

export default {
  namespace: 'users',

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
          return dispatch.users.replace({ ...{}, page });
        }

        const response = await Api.get(`/search/users?q=${term}&per_page=5&page=${page}`);
        const { data } = response;

        return !data || data.length < 1
          ? true
          : dispatch.users.replace({ data, page });
      } catch (error) {
        throw HandleErrorMessage(error);
      }
    },

    /**
     * Get a single item from the API
     * @returns {Promise}
     * @param {string} id
     */
    async fetchSingle(login) {
      try {
        const response = await Api.get(`/users/${login}`);
        const { data } = response;

        if (!data) {
          throw new Error({ message: errorMessages.users404 });
        }

        return data;
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
