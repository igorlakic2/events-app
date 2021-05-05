/* eslint-disable no-use-before-define */
import React, { useContext, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AppContext from '../AppContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
    margin: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(3),
    }
  },
}));

export default function Tags() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const getCities = async (country) => {
    const countryId = country === 'spain' ? 724 : country === 'germany' ? 276 : country === 'poland' ? 616 : null;
    const response = await axios.get(`https://app.ticketmaster.eu/amplify/v2/cities?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${country}&lang=en-us&country_id=${countryId}`);
    console.log(response.data.cities);
    const cities = response.data.cities.map(city => {
        return city;
    });
    context.setCities(cities);
  }

  useEffect(() => {
      getCities(context.country);
  }, [context.country]);

  const handleChange = (event, value) => {
      context.setCitiesIds(value.map(v => {
          return v.id;
      }));    
      
  }

  useEffect(() => {
    getEventsByCities(context.citiesIds, context.sort, context.navStart)
  }, [context.citiesIds]);

  const getEventsByCities = async (citiesIds, sort, start) => {
    const response = await axios.get(`https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&[%E2%80%A6]&city_ids=${citiesIds}&sort_by=${sort}&start=${start}&rows=12`);
    // citiesIds.length === 0 ? context.setEvents(response)
    console.log(response);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        onChange={handleChange}
        multiple
        id="tags-standard"
        options={context.cities}
        getOptionLabel={(option) => option.name}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            return <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
        })
        }
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Cities" placeholder="Cities" />
        )}
      /> 
    </div>
  );
}
