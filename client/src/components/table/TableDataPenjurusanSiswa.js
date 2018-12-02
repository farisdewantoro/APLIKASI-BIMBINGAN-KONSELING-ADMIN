import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Paper from '@material-ui/core/Paper';

import Tooltip from '@material-ui/core/Tooltip';

import {connect} from 'react-redux';
import {compose} from 'redux';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'no', numeric: false, disablePadding: false, label: 'No Induk Siswa' },
  { id: 'nama', numeric: false, disablePadding: false, label: 'Nama Siswa' },
  { id: 'jenisKelamin', numeric: true, disablePadding: false, label: 'Jenis Kelamin' },
  { id: 'tanggalLahir', numeric: true, disablePadding: false, label: 'Tanggal Lahir' },
  { id: 'namaJurusan', numeric: true, disablePadding: false, label: 'Jurusan' },
  { id: 'percentase', numeric: true, disablePadding: false, label: 'Persentase' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {  order, orderBy, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
       
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};




const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    jawaban:null
  };
  componentWillReceiveProps(nextProps){
    let jawaban = nextProps.jawaban;
    let data =[];
    
    if (jawaban !== null){
   
      this.setState({jawaban:nextProps.jawaban});
      jawaban.forEach(jwb=>{
     
        jwb.jurusan.forEach(jur=>{
            data.push(
              {
                nis:jwb.murid.nis,
                nama:jwb.murid.nama,
                jenisKelamin:jwb.murid.jenisKelamin,
                tanggalLahir:jwb.murid.tanggalLahir,
                namaJurusan:jur.namaJurusan,
                percentase:jur.percentase
              })
        })
      })
      this.setState({data:data});
     console.log(data);
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };



  render() {
    const { classes,loading } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const {jawaban} = this.state;
    // console.log(jawaban);
    let loadingComponent;
    if (loading) {
      loadingComponent = (
        <LinearProgress color="secondary" variant="query" />
      )
    }
    return (
      <Paper className={classes.root}>
        {loadingComponent}
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
           
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n,i) => {
               
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                     
                      tabIndex={-1}
                      key={i}
                    >
                
                      {/* <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell> */}
                      <TableCell >{n.nis}</TableCell>
                      <TableCell >{n.nama}</TableCell>
                      <TableCell numeric>{n.jenisKelamin}</TableCell>
                      <TableCell numeric>{moment(n.tanggalLahir).format("L")}</TableCell>
                      <TableCell numeric>{n.namaJurusan}</TableCell>
                      <TableCell numeric>{Math.round(n.percentase)+'%'}</TableCell>
                 
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { name: "EnhancedTable" }),connect(null))(EnhancedTable);