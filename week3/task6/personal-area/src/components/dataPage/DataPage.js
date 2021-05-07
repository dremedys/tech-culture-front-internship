import React, {Component} from 'react'
import Transformer from "../../services/transformer";
import HeaderInfo from "../headerInfo/headerInfo";
import MainInfo from "../mainInfo/mainInfo";
import '../dataPage/dataPage.css'
import searchImg from '../../../src/assets/images/1.png'
import clickImg from '../../../src/assets/images/2.png'
import bookImg from '../../../src/assets/images/3.png'
import ErrorBlock from "../errorsBar/errorBar";

export default class DataPage extends Component{
    state = {data: {}, errors:[], loading:true, invalidRequest: false}
    transformer = new Transformer()
    setInvalidRequest = (invalidRequest) =>{
        this.setState({invalidRequest})
    }
    setData = (data) => {
        this.setState({data})
        this.setInvalidRequest(false)
        this.setState({loading:false})
    }
    setErrors = (errors) => {
        this.setState({errors})
    }

    updatePage = () => {
        const chosen = this.props.chosen
        this.transformer.transformErrors(chosen).then(res => {this.setErrors(res)}).catch((err)=>{
            this.setErrors([])
        })
        this.transformer.transformData(chosen).then(res => {this.setData(res)}).catch((err)=>{
            console.log(this.setInvalidRequest(true))
        })
    }
    componentDidMount() {
        this.updatePage();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.chosen !== prevProps.chosen){
            this.setInvalidRequest(false)
            this.setState({loading:true})
            this.updatePage()
        }

    }
    render() {
        if(this.state.invalidRequest){
            return (
                <div className={'error-loading'}>
                    <h1>No data is provided for {this.props.chosen}.</h1>
                </div>
            )
        }
        if(!this.state.loading){
            let {data,errors} = this.state
            const headerData = {errors: data.errors, zeroes: data.zeroes,timeout:data.timeout}
            const searchData = {
                differences: { img: searchImg,  label:'Searches', prev: data.searches_previous, cur: data.searches_current,
                },
                additional: { percents: [ {label:'Mobile traffic',content:100}, {label: 'Web traffic',content: 100}],
                    text: 'You get 100% traffic on mobile and desktop devices.', helps:['Searches','Pessimisation']}
            }
            const clickData = {
                differences: {img: clickImg,label: 'Clicks', prev: data.clicks_previous,cur: data.clicks_current},
                additional: {percents: [ {label:'CTR',content:data.ctr}] ,
                    text: 'Conversion from searches to click on all devices.', helps:['CTR','Clicks']}
            }
            const bookingData = {
                differences: {img: bookImg,label: 'Bookings', prev:data.bookings_previous, cur:data.bookings_current},
                additional: {percents: [{label:'STR', content:data.str}, {label: 'Avg. check',content: data.avg_price}],
                    text: 'Conversion from clicks to bookings on all devices', helps: ['STR','Booking','Average check']
                }
            }
            return (
                <div className={'data-page'}>
                    <HeaderInfo data={headerData}></HeaderInfo>
                    <ErrorBlock data={errors}></ErrorBlock>
                    <MainInfo data={searchData}/>
                    <MainInfo data={clickData}/>
                    <MainInfo data={bookingData}/>
                </div>
            )
        }
        return (
            <div className={'error-loading'}>
                <h1>Loading...</h1>
            </div>
        )
    }
}
;
