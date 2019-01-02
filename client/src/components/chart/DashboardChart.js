import React, { Component } from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
const data = [
    { name: 'Page A', percentase: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', percentase: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', percentase: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', percentase: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', percentase: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', percentase: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', percentase: 3490, pv: 4300, amt: 2100 },
];

 class DashboardChart extends Component {
     state={
         dataResult:[],
         banyak:0
     }
    componentWillReceiveProps(nextProps){
        if(this.props.jawaban !== nextProps.jawaban){
            let jawaban = nextProps.jawaban;
            let dataJurusan=[];
            jawaban.forEach(j => {
                j.jurusan.forEach(jur=>{
                        dataJurusan.push({ name: jur.namaJurusan, percentase: Math.round(jur.percentase) });
                })
            });
            let length = jawaban.length;
            var result = [];
            dataJurusan.reduce((res, value)=> {
                if (!res[value.name]) {
                    res[value.name] = {
                        percentase: 0,
                        name: value.name
                    };
                    result.push(res[value.name])
                }
                res[value.name].percentase = ((res[value.name].percentase +value.percentase) / length)
                return res;
            }, {});
            this.setState({
                dataResult:result,
                banyak: length
            })

         
        
          
        }
    }
  render() {
      console.log(this.state.dataResult)
    return (
        <Card>
            <CardHeader title={`Hasil rata-rata vote yang diambil dari ${this.state.banyak} pengguna`}/>
            <CardContent>
                <BarChart width={800} height={400} data={this.state.dataResult}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentase" fill="#8884d8" />

                </BarChart>
            </CardContent>
        </Card>
       
    )
  }
}

export default DashboardChart;
