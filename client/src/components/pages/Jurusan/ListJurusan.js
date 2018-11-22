import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { compose } from 'redux';
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

class ListJurusan extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    findSoal = (kodeSoal) =>{
        const {pertanyaan} = this.props;
        let soal;
        pertanyaan.filter((tanya,i)=>{
            if(tanya.kodeSoal === kodeSoal){
                soal= tanya.soal;
                return;
            }
        });
        return soal;
    }

    findJawaban = (kodeSoal,kodeJawaban) =>{
        const { pertanyaan } = this.props;
        let jawaban;
       pertanyaan.filter((tanya, i) => {
            if (tanya.kodeSoal === kodeSoal) {
                tanya.jawaban.filter((jawab)=>{
                    if(jawab.kodeJawaban === kodeJawaban){
                        jawaban = jawab.jawab;
                        return;
                    }
                });
            }
        });
        return jawaban;
        }

    render() {
        const { classes, jurusan } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {jurusan.map((jurusan, i) => {
                    return (
                        <ExpansionPanel
                            expanded={expanded === jurusan.namaJurusan}
                            onChange={this.handleChange(jurusan.namaJurusan)}
                            key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >{jurusan.namaJurusan}</Typography>

                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>

                                <Grid container direction="row" spacing={16}>
                                    <Grid item xs={12}> 
                                        <Typography>
                                            Deskripsi
                                        </Typography>
                                        <Divider/>
                                        <Typography>
                                            {jurusan.deskripsi}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container direction="column">
                                            {jurusan.rule.map((rule, i) => {
                                                return (
                                                    <Grid container direction="row" key={i}>
                                                        <Grid item xs={12}>
                                                            <Typography >{`${this.findSoal(rule.kodeSoal)} ${this.findJawaban(rule.kodeSoal, rule.kodeJawaban)}`}   </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography ></Typography>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                             

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}

            </div>
        );
    }
}

ListJurusan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { name: 'ListJurusan' }), connect(null))(ListJurusan);