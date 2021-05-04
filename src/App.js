import { ContactSupportRounded } from '@material-ui/icons';
import React, { useState } from 'react'
import AppContext from './AppContext';
import TestDrawer from './components/TestDrawer';

const App = () => {
    const [country, setCountry] = useState('poland');
    const [categories, setCategories] = useState('');
    const [sort, setSort] = useState('eventname');
    const [pagination, setPagination] = useState({});
    const [navStart, setNavStart] = useState(0);
    const [view, setView] = useState('grid');

    const setCountryHandler = (country) => {
        setCountry(country);
    }

    const setCategoriesHandler = (categories) => {
        setCategories(categories);
    }

    const setSortMethod = (sort) => {
        setSort(sort);
    }

    const setPaginationHandler = (pagInfo) => {
        setPagination(pagInfo)
    }
    
    const setNavStartHandler = x => {
        setNavStart(x);
    }

    const setViewHandler = view => {
        setView(view);
    }

    return (
        <div>
            <AppContext.Provider 
                value={{ 
                    country: country,
                    categories: categories,
                    setCountry: (country) => setCountryHandler(country),
                    setCategoriesH: (categories) => setCategoriesHandler(categories),
                    sort: sort,
                    setSort: (sort) => setSortMethod(sort),
                    pagination: pagination,
                    setPaginationContext: (pag) => setPaginationHandler(pag),
                    navStart: navStart,
                    setNavStart: (x) => setNavStartHandler(x),
                    view: view,
                    setView: (view) => setViewHandler(view)         
                }}
                >
                <TestDrawer />
            </AppContext.Provider>
        </div>
    )
}

export default App;