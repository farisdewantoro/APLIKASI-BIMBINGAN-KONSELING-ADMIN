import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class DataNilaiRapot extends React.Component {
    state = {
        expanded: null,
        rapots:[
            {kelas:'Kelas 10',semester:[
            {
                nama:'Nilai Semester I',
                link:`/rapotsiswa/data/${this.props.murid.nis}/kelas10/semester1`
            },
            {
                nama: 'Nilai Semester II',
                link: `/rapotsiswa/data/${this.props.murid.nis}/kelas10/semester2`
            },
            ]},
            {
                kelas: 'Kelas 11', semester: [
                    {
                        nama: 'Nilai Semester I',
                        link: `/rapotsiswa/data/${this.props.murid.nis}/kelas11/semester1`
                    },
                    {
                        nama: 'Nilai Semester II',
                        link: `/rapotsiswa/data/${this.props.murid.nis}/kelas11/semester2`
                    },
                ]
            },
            {
                kelas: 'Kelas 12', semester: [
                    {
                        nama: 'Nilai Semester I',
                        link: `/rapotsiswa/data/${this.props.murid.nis}/kelas12/semester1`
                    },
                    {
                        nama: 'Nilai Semester II',
                        link: `/rapotsiswa/data/${this.props.murid.nis}/kelas12/semester2`
                    },
                ]
            }
            
        ]
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded,rapots } = this.state;
        return (
            <div className={classes.root}>
                <Grid container direction="column" >
                
                        {rapots.map((rapot, i) => {
                    
                            return (
                                
                                <ExpansionPanel  expanded={expanded === rapot.kelas} key={i} onChange={this.handleChange(rapot.kelas)}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>{rapot.kelas}</Typography>
                                    </ExpansionPanelSummary>
                                    <Divider />
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={16}>
                                {rapot.semester.map((semester,i)=>{
                                    return(
                                   
                                            <Grid item xs={12} key={i}>
                                                <Button variant="contained" style={{ width: '100%' }} component={Link} to={semester.link}>
                                                    {semester.nama}
                                                </Button>

                                            </Grid>
                                          
                                    
                                       
                                    )
                                                })}
                                          <Divider />
                                       </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                  
                            )

                        })}
             
                    
            </Grid>
            </div>
                
             
          
        );
    }
}

DataNilaiRapot.propTypes = {
    classes: PropTypes.object.isRequired,
    murid:PropTypes.object.isRequired
};

export default withStyles(styles)(DataNilaiRapot);