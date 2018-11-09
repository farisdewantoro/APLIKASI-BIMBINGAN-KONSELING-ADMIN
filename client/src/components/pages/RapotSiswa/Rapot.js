import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getRapotMurid} from '../../../actions/muridActions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import MuridDetail from './MuridDetail';
const styles = theme => ({
    paper: {
        ...theme
            .mixins
            .gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

class Rapot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            murid: {
                tempatLahir: '',
                jenisKelamin: '',
                nis: '',
                nama: '',
                tanggalLahir: '',
                namaAyah: '',
                namaIbu: '',
                noTelepon: '',
                hpSiswa: '',
                hpIbu: '',
                hpAyah: '',
                alamat: ''
            }
        }
    }
    componentDidMount() {
        this
            .props
            .getRapotMurid(this.props.match.params.nis);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.rapot.murid) {
            let murid = nextProps.rapot.murid;
            this.setState({
                murid: {
                    nama: murid.nama,
                    tempatLahir: murid.tempatLahir,
                    jenisKelamin: murid.jenisKelamin,
                    nis: murid.nis,
                    nama: murid.nama,
                    tanggalLahir: murid.tanggalLahir,
                    namaAyah: murid.namaAyah,
                    namaIbu: murid.namaIbu,
                    noTelepon: murid.noTelepon,
                    hpSiswa: murid.hpSiswa,
                    hpIbu: murid.hpIbu,
                    hpAyah: murid.hpAyah,
                    alamat: murid.alamat
                }
            });
        }
    }
    render() {
        const {murid} = this.state;
        const {classes} = this.props
        return (
            <div className="rapot-siswa">
                <MuridDetail murid={murid} />
            </div>
        )
    }
}
Rapot.propTypes = {
    rapot: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({rapot: state.rapot});
export default compose(withStyles(styles, {name: "Rapot"}), connect(mapStateToProps, {getRapotMurid}))(Rapot);