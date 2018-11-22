import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '5%',
        color: theme.palette.text.secondary,
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

class ListPertanyaan extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes,data } = this.props;
        const { expanded } = this.state;
    
        return (
            <div className={classes.root}>
            {data.map((pertanyaan,i)=>{
                return(
                    <ExpansionPanel 
                    expanded={expanded === pertanyaan.kodeSoal}
                     onChange={this.handleChange(pertanyaan.kodeSoal)}
                     key={i}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{pertanyaan.kodeSoal}</Typography>
                            <Typography className={classes.secondaryHeading}>{pertanyaan.soal}</Typography>
                          
                        </ExpansionPanelSummary>
                        <Divider/>
                        <ExpansionPanelDetails>
                        <Grid container direction="column">
                        {pertanyaan.jawaban.map((jwb,i)=>{
                            return(
                                <Grid container direction="row" key={i}>
                                    <Grid item xs={1}>
                                        <Typography >{jwb.kodeJawaban}</Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography >{jwb.jawab}</Typography>
                                    </Grid>                              
                                </Grid>  
                            )
                        })}
                            </Grid>
                           
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
               
            </div>
        );
    }
}

ListPertanyaan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles,{name:'ListPertanyaan'}),connect(null))(ListPertanyaan);