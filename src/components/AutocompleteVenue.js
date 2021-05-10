/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from 'react'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AppContext from '../AppContext'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 180,
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(0),
    },
}))

export default function Tags() {
    const classes = useStyles()
    const context = useContext(AppContext)
    const [venuesTerm, setVenuesTerm] = useState('')
    const [venues, setVenues] = useState([])
    const [venuesIds, setVenuesIds] = useState([])

    const getVenues = async (country, term) => {
        const response = await axios.get(
            `https://app.ticketmaster.eu/amplify/v2/venues?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${country}&venue_name=${term}`
        )
        setVenues(response.data.venues)
    }

    useEffect(() => {
        getVenues(context.country, venuesTerm)
    }, [context.country, venuesTerm])

    const handleChange = (event, value) => {
        const arr = value.map((v) => v.id)
        setVenuesIds(arr)
    }

    const handleValueChange = (event) => {
        setVenuesTerm(event.target.value)
    }

    const getEventsByVenues = async (venues, sort, start, country) => {
        let url = `https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&`;
        venuesIds.length === 0
            ? (url = `${url}domain=${country}&lang=en-us&sort_by=${sort}&start=${start}&rows=12`)
            : (url = `${url}[%E2%80%A6]&venue_ids=${venues}&sort_by=${sort}&start=${start}&rows=12`)

        const response = await axios.get(url)
        context.setEvents(response.data.events)
        context.setPaginationContext(response.data.pagination)
    }

    useEffect(() => {
        getEventsByVenues(
            venuesIds,
            context.sort,
            context.navStart,
            context.country
        )
    }, [venuesIds, context.sort, context.navStart])

    return (
        <div className={classes.root}>
            <Autocomplete
                onChange={handleChange}
                multiple
                id="tags-standard"
                options={venues}
                getOptionLabel={(option) => option.name}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        return (
                            <Chip
                                variant="outlined"
                                label={option.name}
                                {...getTagProps({ index })}
                            />
                        )
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Venues"
                        onChange={handleValueChange}
                        placeholder="Venues"
                    />
                )}
            />
        </div>
    )
}
