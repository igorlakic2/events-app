import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppContext from '../AppContext';
import axios from 'axios';

import Countries from './Countries';
import Categories from './Categories';
import Sort from './Sort';
import Event from './Event';
import Pagination from './Pagination';
import View from './View';
import GridCard from './GridCard';
import ListCard from './ListCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center'
  },
  pag: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [events, setEvents] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <Countries />
      </List>
      <Divider />
      <List>
        <Categories />
      </List>
      <Divider />
      <List>
        <Sort />
      </List>
      <Divider />
      <List>
        <View />
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const context = useContext(AppContext);

  const getEvents = async (country, sort, categories, start) => {    
    let url = ``;

    const asArray = Object.entries(categories);
    const onlyTrue = asArray.filter(([key, value]) => value === true);
    const selectedCategories = onlyTrue.map(category => {
      return category[0];
    });

    selectedCategories.length === 0 ? 
      url = `https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${country}&lang=en-us&sort_by=${sort}&start=${start}&rows=12`
    :
      url = `https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88&domain=${country}&lang=en-us&category_ids=${selectedCategories.join('%2c')}&sort_by=${sort}&start=${start}&rows=12`;
    
    const response = await axios.get(url);
    setEvents(response.data.events);
    context.setPaginationContext(response.data.pagination);
    console.log(response.data.events);
  }

  const eventsList = events.map(event => {
    return context.view === 'grid' ? 
         <GridCard 
              date={event.event_date ? event.event_date.value : 'No date'} 
              image={event.images && event.images.large && event.images.large.url ? event.images.large.url : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-720x530.jpg'} 
              key={event.id}  
              name={event.name ? event.name : 'Unknown'} 
              place={event.venue && event.venue.name ? event.venue.name : 'Unknown'} 
              location={event.venue && event.venue.location && event.venue.location.address && event.venue.location.address.address ? event.venue.location.address.address : 'Unknown'}
              />  : 
          <ListCard
              date={event.event_date ? event.event_date.value : 'No date'} 
              image={event.images && event.images.large && event.images.large.url ? event.images.large.url : 'https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-720x530.jpg'} 
              key={event.id}  
              name={event.name ? event.name : 'Unknown'} 
              place={event.venue && event.venue.name ? event.venue.name : 'Unknown'} 
              location={event.venue && event.venue.location && event.venue.location.address && event.venue.location.address.address ? event.venue.location.address.address : 'Unknown'}
          />
        
      
  });

  useEffect(() => {
      getEvents(context.country, context.sort, context.categories, context.navStart);
  }, [context.country, context.sort, context.categories, context.navStart]);

  useEffect(() => {
    context.setNavStart(0);
  }, [context.country, context.sort, context.categories]);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Events
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.main}>
              {eventsList}
          </div>        
        </main>
      </div>
      <div className={classes.pag}>
        <Pagination />
      </div>      
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;