import React, { useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import AppContext from '../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
}));

export default function RadioButtonsGroup() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const [value, setValue] = React.useState(context.country);

  const handleChange = (event) => {
    setValue(event.target.value);
    context.setCountry(event.target.value)
  };

  return (
    <FormControl component="fieldset"  className={classes.formControl}>
      <FormLabel component="legend">Country</FormLabel>
      <RadioGroup aria-label="country" name="country" value={value} onChange={handleChange}>
        <FormControlLabel value="germany" control={<Radio />} label="Germany" />
        <FormControlLabel value="spain" control={<Radio />} label="Spain" />
        <FormControlLabel value="poland" control={<Radio />} label="Poland" />
      </RadioGroup>
    </FormControl>
  );
}