import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import FormHelperText from '@material-ui/core/FormHelperText';
import CardContent from '@material-ui/core/CardContent';
const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    textTransform:'uppercase'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function MuridDetail(props) {
  const { classes } = props;
  const {murid} = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>NIS</Typography>
            <Typography className={classes.heading}>{murid.nis}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.heading}>NAMA</Typography>
            <Typography className={classes.heading}>{murid.nama}</Typography>
          </div>
            <div className={classes.column}>
            <Typography className={classes.heading}>TANGGAL LAHIR</Typography>
            <Typography className={classes.heading}>{murid.tanggalLahir}</Typography>
          </div>
        </ExpansionPanelSummary>
              <Divider />
        <ExpansionPanelDetails className={classes.details}>
             
                          <Grid container spacing={40}>
                              <Grid item xs={6}>
                                  <TextField
                                      id="filled-full-width"
                                      label="NIS"
                                      name="nis"
                                      value={murid.nis}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />

                                  <TextField
                                      id="filled-full-width"
                                      label="Nama"
                                      name="nama"
                              value={murid.nama}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />

                                  <TextField
                                      id="filled-full-width"
                                      label="Nama Ayah"
                                      name="namaAyah"
                              value={murid.namaAyah}
                              
                                
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <TextField
                                      id="filled-full-width"
                                      label="Nama Ibu"
                                      name="namaIbu"
                               value={murid.namaIbu}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <TextField
                                      id="filled-full-width"
                                      label="No.Telepon"
                                      name="noTelepon"
                                      type="number"
                              value={murid.noTelepon}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <TextField
                                      id="filled-full-width"
                                      label="HP.Siswa"
                                      name="hpSiswa"
                                      type="number"
                              value={murid.hpSiswa}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <TextField
                                      id="filled-full-width"
                                      label="HP.Ayah"
                                      name="hpAyah"
                                      type="number"
                              value={murid.hpAyah}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <TextField
                                      id="filled-full-width"
                                      label="HP.Ibu"
                                      name="hpIbu"
                                      type="number"
                              value={murid.hpIbu}
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />

                              </Grid>

                              <Grid item xs={6}>
                                  <FormControl fullWidth
                                  

                                      className={classes.formControl} margin="normal"
                                      style={{ margin: 10 }} >
                                      <InputLabel htmlFor="tempat-lahir">Tempat Lahir</InputLabel>
                                      <Select
                                 
                                          inputProps={{
                                              name: 'tempatLahir',
                                              id: 'tempat-lahir',
                                          }}
                                      >
                                          
                                              <MenuItem key="{kt} "value="{kt}">
                                                 asd
                                              </MenuItem>
                                        
                                      </Select>
                                      <FormHelperText error>err</FormHelperText >

                                  </FormControl>

                                  <TextField
                                      id="datetime-local"
                                      label="Tanggal Lahir"
                                      type="datetime-local"
                                      margin="normal"
                                      name="tanggalLahir"
                              value={murid.tanggalLahir}
                                      fullWidth
                                  
                                      style={{ margin: 10 }}
                                      className={classes.textField}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />
                                  <FormControl component="fieldset"
                             

                                      className={classes.formControl} fullWidth>
                                      <FormLabel component="legend">Jenis Kelamin</FormLabel>
                                      <RadioGroup
                                          aria-label="jenisKelamin"
                                          name="jenisKelamin"

                                          row
                                          margin="normal"
                                          style={{ margin: 10 }}
                                      >
                                          <FormControlLabel
                                              value="Pria"
                                              control={<Radio color="primary" />}
                                              label="Pria"
                                          />
                                          <FormControlLabel
                                              value="Wanita"
                                              control={<Radio color="primary" />}
                                              label="Wanita"
                                          />
                                      </RadioGroup>

                                      <FormHelperText error>err</FormHelperText>
                                  </FormControl>
                                  <TextField
                                      id="filled-full-width"
                                      label="Alamat"
                                      name="alamat"
                                      multiline
                              value={murid.alamat}
                                      rows="4"
                                      variant="outlined"
                                 
                                      style={{ margin: 10 }}
                                      fullWidth
                                      margin="normal"
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />

                             

                              </Grid>
                          </Grid>



        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

MuridDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  murid:PropTypes.object.isRequired
};

export default withStyles(styles)(MuridDetail);