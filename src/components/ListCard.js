import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PlaceIcon from '@material-ui/icons/Place';
import AppContext from '../AppContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    margin: 15,
    flex: 'auto'
  },
  title: {
      height: 60,
      overflow: 'hidden'
  },
  listView: {
    width: '90%',
    margin: 15,
    flex: 'auto'
  },
  listViewDiv: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  listViewDivU: {
    display: 'unset'
  },
  contentWidth: {
      width: '100%'
  },
  iconAlign: {
      verticalAlign: 'bottom'
  },
  image: {
      objectFit: 'contain'
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <Card className={context.view === 'grid' ? classes.root : classes.listView}>
      <CardActionArea className={classes.listViewDiv}>
        <CardMedia
          component="img"
          alt={props.name}
          height="140"
          image={props.image}
          className={classes.image}
        />
        <CardContent className={classes.contentWidth}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {props.name}
          </Typography>
          <div>
            <Typography>
                <CalendarTodayIcon className={classes.iconAlign} /> 
                {props.date}
            </Typography>
            <Typography>
                <PlaceIcon className={classes.iconAlign} />
                {props.place} - {props.location}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}