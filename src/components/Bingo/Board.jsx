import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { Alert } from './Dialog';
import { Numbers } from './Numbers';
import { useBingo } from '../../hooks';

const useStyles = makeStyles({
  root: {
    marginTop: 100
  },
  table: {
    maxWidth: 500
  },
  col: {
    textAlign: 'center'
  },
  button: {
    height: 65
  },
});

const getRowKey = (row, index) => (
  row.reduce((acc, cur) => acc + cur.number, 0)
);

export const Board = () => {
  const classes = useStyles();

  const {
    alert,
    matrix,
    loading,
    numbers,
    handleCardClick
  } = useBingo();

  if (loading) {
    <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Numbers data={numbers} />
      </Grid>
      <Grid item xs={8}>
        <div className={classes.root}>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="custom pagination table">
              <TableBody>
                {
                  matrix.map((row, rowIndex) => (
                    <TableRow key={getRowKey(row)}>
                      {
                        row.map((col, colIndex) => (
                          <TableCell
                            key={col.number} component="th" scope="row" className={classes.col}>
                            <Button
                              className={classes.button}
                              variant={col.selected ? 'outlined' : 'contained'}
                              onClick={() => handleCardClick(rowIndex, colIndex)}>
                              {col.number}
                            </Button>
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div >
      </Grid>
      <Alert
        text={alert?.text}
        show={Boolean(alert)}
        onClick={alert?.onClick}
      />
    </Grid>
  );
};