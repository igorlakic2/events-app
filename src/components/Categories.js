import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios';
import AppContext from '../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


export default function CheckboxesGroup() {
  const classes = useStyles();
  const context = useContext(AppContext);
  
  const niz = [];  
  const [state, setState] = useState([]);
  const [obj, setObj] = useState({});

  const handleChange = event => {
    event.target.checked ? setObj({...obj, [event.target.value]: true}) : setObj({...obj, [event.target.value]: false});
  }
  
  useEffect(() => {
    context.setCategoriesH(obj);
  }, [obj]);

  const [categories, setCategories] = useState([]);


  const getCategories = async (country) => {
    const response = await axios.get(`https://app.ticketmaster.eu/amplify/v2/categories?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${country}&lang=en-us`);
    setCategories(response.data.categories);
  }

  useEffect(() => {
    getCategories(context.country); 
  }, [context.country]);

  const categoriesList = categories.map((category) => {
    return (<FormControlLabel
        control={<Checkbox onChange={handleChange} name={category.name} value={category.id} />}
        label={category.name}
        key={category.id}
    />);
  });

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          {categoriesList}
        </FormGroup>
      </FormControl>
    </div>
  );
}