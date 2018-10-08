import React, { Component } from 'react';
import UnexpectedError from '../../components/UnexpectedError';
import Sentry from 'sentry-expo';

class GeneralErrorBoundaryScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      hasError: false,
      errorInfo: ''
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorInfo: info
    });

    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return <UnexpectedError/>;
    } else {
      return this.props.children;
    }
  }
}

export default GeneralErrorBoundaryScreen;