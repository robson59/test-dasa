import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Users/Single';

class UsersSingleContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false, error: null, user: {} };
  }

  componentDidMount = () => this.fetchData();

  /**
   * Fetch Data
   */
  fetchData = async () => {
    const { fetchData, login } = this.props;

    this.setState({ loading: true, error: null });

    try {
      const user = await fetchData(login);
      this.setState({ loading: false, error: null, user });
    } catch (err) {
      this.setState({ loading: false, error: err.message, user: {} });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, user } = this.state;

    return <Layout loading={loading} error={error} user={user} reFetch={this.fetchData} />;
  };
}

UsersSingleContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  login: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UsersSingleContainer.defaultProps = {
  login: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.users.fetchSingle,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSingleContainer);
