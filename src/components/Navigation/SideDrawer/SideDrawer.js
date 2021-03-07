import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxillary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        {/* cannot pass an array of strings, but only a single string, which is why we then use join with a space between the class names */}
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </div>
    </Auxillary>
  )
}

export default sideDrawer;