// import React, { useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// import AppsIcon from '@material-ui/icons/Apps';
// import ReorderIcon from '@material-ui/icons/Reorder';

// import AppContext from '../AppContext';
// import { Button, FormGroup } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
//   view: {
//       display: 'flex',
//       flexDirection: 'row'
//   }
// }));

// export default function RadioButtonsGroup() {
//   const classes = useStyles();
//   const context = useContext(AppContext);

//   const changeView = (view) => {
//     context.setView(view);
//   }

//   return (
//     <FormControl component="fieldset"  className={classes.formControl}>
//       <FormLabel component="legend">View</FormLabel>
//       <FormGroup className={classes.view}>
//         <Button variant="contained" color="primary" onClick={() => changeView('grid')}>
//             <AppsIcon />
//         </Button>
//         <Button variant="contained" color="primary" onClick={() => changeView('list')}>
//             <ReorderIcon />
//         </Button>
//       </FormGroup>
//     </FormControl>
//   );
// }


import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import AppContext from '../AppContext';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    view: {
        display: 'flex',
        flexDirection: 'row'
    }
  }));

export default function NativeSelects() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const changeView = (event) => {
    context.setView(event.target.value);
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">View</FormLabel>
        <NativeSelect
          defaultValue="eventname"
          onChange={changeView}
        >
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </NativeSelect>
      </FormControl>      
    </div>
  );
}
