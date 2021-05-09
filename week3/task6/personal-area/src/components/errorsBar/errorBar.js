import React, {Component} from 'react'
import './error-bars.css'
import {sum} from "../../services/compute";
export default class ErrorBlock extends Component{
    render() {
        const sumAll = sum(this.props.data, 'count')

        if(sumAll === 0){
            return  (
                <p className={'no-error'}>No server errors.</p>
            )
        }

        const mainErrorCodes = [500,501,502]
        const colors = {500:'yellow-bg',
                        501:'violet-bg',
                        502:'blue-bg',
                        'Other':'silver-bg'}

        let data = this.props.data.filter(item => mainErrorCodes.includes(item.code))

        data.push({
            code: 'Other',
            count: sumAll - sum(data, 'count')
        })

        const barBlock = data.map(item => {return (
            <span style={{
                width: `${item.count *100 / sumAll}%`,
                height: '5px'
                }} className={colors[item.code]}></span>
        )})
        const detailedBlock = data.map(item => {
            const label = item.code === 'Other' ? item.code : 'Error '+ item.code
            return(
                    <div className={'error-bar__detailed small bolder'}>
                      <span className={'detailed__rectangle '+colors[item.code]}></span>
                        <span>{label}: {item.count}</span>
                    </div>
            )
        })
        return (
            <div className={'error-block'}>
                <div className={'error-block__error-bar'}>
                    {barBlock}
                </div>
                <div className={'error-block__detailed-block'}>
                    {detailedBlock}
                </div>
            </div>
        )
    }
}
