import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AppContext from '../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const context = useContext(AppContext);
  const classes = useStyles();

  const nextPage = (count) => {
    context.setNavStart(count + 12);
  }
  const prevPage = (count) => {
    context.setNavStart(count - 12);
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" disabled={context.navStart === 0 ? true : false} onClick={() => prevPage(context.navStart)}>
        <KeyboardArrowLeftIcon />
      </Button>
      <Button variant="contained" color="primary" disabled={context.navStart + 12 > context.pagination.total ? true : false} onClick={() => nextPage(context.navStart)}>
        <KeyboardArrowRightIcon />
      </Button>
    </div>
  );
}