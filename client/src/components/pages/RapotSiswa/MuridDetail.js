import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

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
import moment from 'moment';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    textTransform:'uppercase',
   
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
          <ExpansionPanel expanded={props.expanded} >
              <ExpansionPanelSummary onClick={props.onClickExpanded} expandIcon={<ExpandMoreIcon  />}>
          <div className={classes.column}>
                      <Typography className={classes.heading}> <strong>NIS</strong> </Typography>
            <Typography className={classes.heading}>{murid.nis}</Typography>
          </div>
          <div className={classes.column}>
                      <Typography className={classes.heading}> <strong>NAMA</strong> </Typography>
            <Typography className={classes.heading}>{murid.nama}</Typography>
          </div>
            <div className={classes.column}>
                      <Typography className={classes.heading}> <strong>TANGGAL LAHIR</strong> </Typography>
                      <Typography className={classes.heading}>{moment(murid.tanggalLahir).format("LL")}</Typography>
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
                                      disabled
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                  />

                                  <TextField
                                      id="filled-full-width"
                                      label="Nama"
                                      name="nama"
                              value={murid.nama}
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                              onChange={props.onChange}
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
                                            value={murid.tempatLahir}
                                  onChange={props.onChange}
                                          inputProps={{
                                              name: 'tempatLahir',
                                              id: 'tempat-lahir',
                                          }}
                                      >
                                          
                                              <MenuItem key="{kt} "value={murid.tempatLahir}>
                                      {murid.tempatLahir}
                                              </MenuItem>
                                        
                                      </Select>
                                    

                                  </FormControl>

                                  <TextField
                                      id="datetime-local"
                                      label="Tanggal Lahir"
                                      type="date"
                                      margin="normal"
                                      name="tanggalLahir"
                              onChange={props.onChange}
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
                                        onChange={props.onChange}
                                        value={murid.jenisKelamin}
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
                              onChange={props.onChange}
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
                  <Button size="small" onClick={props.onClickCancel} >Cancel</Button>
                  <Button size="small" color="primary" onClick={props.onClickSubmit}>
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