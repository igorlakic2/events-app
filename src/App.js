import React, { useState } from 'react'
import AppContext from './AppContext'
import TestDrawer from './components/TestDrawer'

const App = () => {
    const [country, setCountry] = useState('poland')
    const [categories, setCategories] = useState('')
    const [sort, setSort] = useState('eventname')
    const [pagination, setPagination] = useState({})
    const [navStart, setNavStart] = useState(0)
    const [view, setView] = useState('grid')
    const [cities, setCities] = useState([])
    const [citiesIds, setCitiesIds] = useState([])
    const [events, setEvents] = useState([])
    const [venues, setVenues] = useState([])

    const setCountryHandler = (country) => {
        setCountry(country)
    }

    const setCategoriesHandler = (categories) => {
        setCategories(categories)
    }

    const setSortMethod = (sort) => {
        setSort(sort)
    }

    const setPaginationHandler = (pagInfo) => {
        setPagination(pagInfo)
    }

    const setNavStartHandler = (x) => {
        setNavStart(x)
    }

    const setViewHandler = (view) => {
        setView(view)
    }

    const setCitiesHandler = (cities) => {
        setCities(cities)
    }

    const setCitiesIdsHandler = (ids) => {
        setCitiesIds(ids)
    }

    const setEventsHandler = (events) => {
        setEvents(events)
    }

    const setVenuesHandler = (venues) => {
        setVenues(venues)
    }

    return (
        <div>
            <AppContext.Provider
                value={{
                    country: country,
                    categories: categories,
                    setCountry: (country) => setCountryHandler(country),
                    setCategoriesH: (categories) =>
                        setCategoriesHandler(categories),
                    sort: sort,
                    setSort: (sort) => setSortMethod(sort),
                    pagination: pagination,
                    setPaginationContext: (pag) => setPaginationHandler(pag),
                    navStart: navStart,
                    setNavStart: (x) => setNavStartHandler(x),
                    view: view,
                    setView: (view) => setViewHandler(view),
                    cities: cities,
                    setCities: (cities) => setCitiesHandler(cities),
                    citiesIds: citiesIds,
                    setCitiesIds: (ids) => setCitiesIdsHandler(ids),
                    events: events,
                    setEvents: (events) => setEventsHandler(events),
                    venues: venues,
                    setVenues: (venues) => setVenuesHandler(venues),
                }}
            >
                <TestDrawer />
            </AppContext.Provider>
        </div>
    )
}

export default App
