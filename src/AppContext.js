import React from 'react'

export default React.createContext({
    country: 'germany',
    categories: '',
    setCountry: (country) => {},
    setCategoriesH: (categories) => {},
    sort: 'eventname',
    setSort: (sort) => {},
    pagination: {},
    setPaginationContext: (pag) => {},
    navStart: 0,
    setNavStart: (x) => {},
    view: 'grid',
    setView: (view) => {},
    cities: [],
    setCities: (cities) => {},
    citiesIds: [],
    setCitiesIds: (ids) => {},
    events: [],
    setEvents: (events) => {},
    venues: [],
    setVenues: (venues) => {},
})
