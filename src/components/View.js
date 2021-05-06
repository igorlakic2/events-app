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
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1)
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
