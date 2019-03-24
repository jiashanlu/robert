import React, { Component, Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  render() {
    const { handleClose } = this.props;

    return (
      <Fragment>
        <DialogTitle>Well Done!</DialogTitle>
        <DialogContent>
          <h1>Thank you so much, your order is confirmed :-)</h1>
          <Button onClick={handleClose} variant="contained" color="secondary">
            exit
          </Button>
        </DialogContent>
      </Fragment>
    );
  }
}

export default Confirm;
