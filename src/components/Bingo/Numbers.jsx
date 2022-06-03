import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  numberRoot: {
    marginTop: 100,
    display: 'grid',
    justifyContent: 'flex-end'
  },
  table: {
    maxWidth: 500
  },
  col: {
    height: 65,
    textAlign: 'center'
  },
  arrow: {
    paddingTop: 35
  }
});

export const Numbers = (props) => {
  const { data } = props;

  const classes = useStyles();

  const numbersArray = useMemo(() => (
    [...data].splice(0, 5)
  ), [data]);

  return (
    <div className={classes.numberRoot}>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          {
            numbersArray.length ? (
              <Typography className={classes.arrow}>-></Typography>
            ) : null
          }
        </Grid>
        <Grid item xs={7}>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="custom pagination table">
              <TableBody>
                {
                  numbersArray.map((number) => (
                    <TableRow key={number}>
                      <TableCell component="th" scope="row" className={classes.col}>
                        {number}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div >
  );
};

Numbers.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired
};