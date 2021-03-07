import React, {Component} from 'react';

import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    // this improves performance as the order summary is also not rerendered unnecessarily as ingredients are added because the modal wraps the order summary component

  render() {
    return (
    <Auxillary>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        />
      <div
      className={classes.Modal}
      style={{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: this.props.show ? '1' : '0'
      }}
    >
    {this.props.children}
    </div>
  </Auxillary>
  )
  }
}

export default Modal;

// side effects = reaching out to a web service and fetching data from there, componentDidMount and other lifecyle methods (componentDidUpdate) will become more important when we begin to do that