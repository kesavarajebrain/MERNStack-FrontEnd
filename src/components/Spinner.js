import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
function Spinner() {
  // const [open, setOpen] = React.useState(false);
  const open = useSelector(
    (state) => state.spinner.setOpen
  );
  // const handleClose = () => {
  //   setOpen(false);
  // };
 
  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Spinner;