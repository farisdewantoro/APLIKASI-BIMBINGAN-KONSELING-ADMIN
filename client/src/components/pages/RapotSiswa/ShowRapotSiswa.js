import React, { Component } from 'react'
import { getRapotMurid } from '../../../actions/muridActions';
import { createRapotMurid, getDataRapotMurid } from '../../../actions/rapotActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TableNilaiRapot from '../../table/TableNilaiRapot';

const styles = theme => ({
    infoSiswa: {
        fontWeight: "bold",
        textTransform: "Uppercase"
    },

    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    margin: {
        marginBottom: 20
    },
    paperRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    addIcon: {
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

class ShowRapotSiswa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            murid: {
                nis: '',
                nama: '',
                tanggalLahir: '',
            },
            rapot: {
                murid: '',
                kelas: '',
                semester: '',
                namaKelas: "",
                tahunPelajaran: "",
                pelajaran: [
                    { mataPelajaran: '', nilai: '', predikat: '' }
                ]
            }

        }
    }
    componentDidMount() {

        this.props.getDataRapotMurid(this.props.match.params.nis, this.props.match.params.kelas, this.props.match.params.semester);
        this
            .props
            .getRapotMurid(this.props.match.params.nis);
        this.setState({
            rapot: {
                kelas: this.props.match.params.kelas,
                semester: this.props.match.params.semester,
                namaKelas: "",
                tahunPelajaran: "",
                pelajaran: [
                    { mataPelajaran: '', nilai: '', predikat: '' }
                ]
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.rapot.murid) {
            let murid = nextProps.rapot.murid;
            this.setState({
                murid: {
                    nama: murid.nama,
                    nis: murid.nis,
                    tanggalLahir: murid.tanggalLahir,
                },

            });
            this.setState(prevState => ({
                rapot: {
                    ...prevState.rapot,
                    murid: murid._id
                }
            }));
        }
        if (nextProps.rapot.rapot && nextProps.rapot.rapot !== null) {
            this.setState({
                rapot: nextProps.rapot.rapot
            })
        }

    }

    handlerTambahField = () => {
        let newPelajaran = this.state.rapot.pelajaran.concat({
            mataPelajaran: '', nilai: '', predikat: ''
        });
        let rapot = {
            ...this.state.rapot, pelajaran: newPelajaran
        }
        this.setState({ rapot: rapot });
    }

    handlerDeletePelajaran = (i) => {
        let deletePelajaran = this.state.rapot.pelajaran.filter((pel, index) => i !== index);

        let rapot = {
            ...this.state.rapot, pelajaran: deletePelajaran
        }
        this.setState({ rapot: rapot });
        // this.setState({rapot:this});
    }
    onChangePelajaran = (i) => (e) => {

        let pelajaranValue = this.state.rapot.pelajaran.map((pel, index) => {
            if (i !== index) return pel;
            return {
                ...pel,
                [e.target.name]: e.target.value
            };
        });
        let rapot = {
            ...this.state.rapot, pelajaran: pelajaranValue
        }
        this.setState({ rapot: rapot });
    }
    onChange = (e) => {
        let fields = e.target.name;
        let fieldsVal = e.target.value;
        this.setState(prevState => ({
            rapot: {
                ...prevState.rapot,
                [fields]: fieldsVal
            }
        }));

    }
    handlerSubmitRapot = () => {
        this.props.createRapotMurid(this.state.murid.nis, this.state.rapot, this.props.history);
    }


    render() {
        const { murid, rapot } = this.state;

        const { classes } = this.props;
 
        return (
            <Grid container spacing={8} direction="row">
            <Grid item xs={12}>
                    <Card>
            
                        <CardContent>
                            <Grid container direction="column" spacing={24}>
                                <Grid item>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                NIS : {murid.nis}
                                            </Typography>

                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                NAMA : {murid.nama}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                TANGGAL LAHIR : {murid.tanggalLahir}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Kelas : {rapot.namaKelas + ' ' + this.props.match.params.kelas.replace(/kelas/g, '')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Semester : {this.props.match.params.semester.replace(/semester/g, '')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" className={classes.infoSiswa}>
                                                Tahun Pelajaran : {rapot.tahunPelajaran}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </CardContent>


                    </Card>
            </Grid>
            
            <Grid item xs={12}>
  
                <TableNilaiRapot rapot={rapot}/>
            </Grid>

            </Grid>
        )
    }
}

ShowRapotSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
    getRapotMurid: PropTypes.func.isRequired,
    rapot: PropTypes.object.isRequired,
    createRapotMurid: PropTypes.func.isRequired,
    getDataRapotMurid: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    rapot: state.rapot
});

export default
    compose(
        withStyles(styles, { name: "ShowRapotSiswa" }),
        connect(mapStateToProps, { getRapotMurid, createRapotMurid, getDataRapotMurid }))(withRouter(ShowRapotSiswa));
