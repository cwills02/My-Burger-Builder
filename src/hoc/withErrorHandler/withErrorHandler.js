import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // we are using componentWillMount to make sure we execute the code below when the component is created not after the child components are rendered which is what would happen if we kept it inside componentDidMount within the withErrorHandler, otherwise we will not handle the error b/c we are reaching out to the web in our burgerbuilder component first, which is the child component so that gets rendered before withErrorHandler would have run the code which can handle the error
    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req;
      })
      // the above code is to make sure that whever we send a request that we no longer have our error set up anymore,it's cleared
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    // this ensures that whenvever we do not need the BurgerBuilder component anymore, that we clean up the interceptors that we attached by using withErrorHandler on the BurgerBuilder,so that if we reuse withErrorHandler we do not create more and more interceptors with the old ones living on
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <Auxillary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
        </Modal>
          <WrappedComponent {...this.props} />
        </Auxillary>
      );
    }
  }
}

export default withErrorHandler;