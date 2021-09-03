import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchGameAPI } from '../redux/actions';

class Play extends Component {
  componentDidMount() {
    const { resultAPI } = this.props;
    resultAPI();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Play.propTypes = {
  resultAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.playerReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  resultAPI: () => dispatch(fetchGameAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
