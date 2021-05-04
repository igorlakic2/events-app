import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import AppContext from '../AppContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(),
  },
}));

export default function NativeSelects() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const handleChange = (event) => {
    context.setSort(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="uncontrolled-native">Sort</InputLabel> */}
        <FormLabel component="legend">Sort</FormLabel>
        <NativeSelect
          defaultValue="eventname"
          onChange={handleChange}
        >
          <option value="eventname">Eventname</option>
          <option value="popularity">Popularity</option>
          <option value="eventdate">Eventdate</option>
        </NativeSelect>
      </FormControl>      
    </div>
  );
}
