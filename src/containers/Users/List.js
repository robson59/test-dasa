import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Users/List';

let delayTimer;

class UsersListContainer extends Component {
  constructor(props) {
    super();

    const page = props.page || props.meta.page;

    this.state = {
      error: null, loading: false, term: null, page: parseInt(page, 10) || 1,
    };
  }

  componentDidMount = () => {
    const { term } = this.state;
    if (term) {
      this.fetchData();
    }
  };

  /**
   * If the page prop changes, update state
  */
  componentDidUpdate = (prevProps) => {
    const { page } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      // eslint-disable-next-line
      this.setState({
        error: null, loading: false, page: parseInt(page, 10) || 1,
      }, this.fetchData);
    }
  };

  search = (text) => {
    clearTimeout(delayTimer);
    this.setState({ loading: true });
    delayTimer = setTimeout(() => {
      this.setState({ term: text });
      this.fetchData();
    }, 500);
  };

  /**
   * Fetch Data
   */
  fetchData = async ({ incrementPage = false } = {}) => {
    const { fetchData } = this.props;

    let { page, term } = this.state;
    page = incrementPage ? page + 1 : 1;

    this.setState({ loading: true, error: null, page });

    try {
      await fetchData({ page, term });
      this.setState({ loading: false, error: null });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { listFlat, meta } = this.props;
    const {
      loading, error, page, term,
    } = this.state;

    return (
      <Layout
        page={page}
        term={term}
        meta={meta}
        error={error}
        loading={loading}
        listFlat={listFlat}
        reFetch={this.fetchData}
        search={this.search}
      />
    );
  };
}

UsersListContainer.propTypes = {
  listFlat: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string,
      id: PropTypes.number,
      node_id: PropTypes.string,
      avatar_url: PropTypes.string,
      gravatar_id: PropTypes.string,
      url: PropTypes.string,
      html_url: PropTypes.string,
      followers_url: PropTypes.string,
      following_url: PropTypes.string,
      gists_url: PropTypes.string,
      starred_url: PropTypes.string,
      subscriptions_url: PropTypes.string,
      organizations_url: PropTypes.string,
      repos_url: PropTypes.string,
      events_url: PropTypes.string,
      received_events_url: PropTypes.string,
      type: PropTypes.string,
      site_admin: PropTypes.bool,
      score: PropTypes.number,
    }),
  ).isRequired,
  meta: PropTypes.shape({
    page: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UsersListContainer.defaultProps = {
  page: 1,
};

const mapStateToProps = (state) => ({
  listFlat: state.users.listFlat || [],
  meta: state.users.meta || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.users.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
