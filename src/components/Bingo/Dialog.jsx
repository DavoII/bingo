import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Alert = (props) => (
  <Dialog
    open={props.show}
    keepMounted
    onClose={props.onClick}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Alert!</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {props.text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClick}>ok</Button>
    </DialogActions>
  </Dialog>
);


Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
};