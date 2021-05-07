import React, {Component} from 'react'
import './error-bars.css'
export default class ErrorBlock extends Component{
    sum(arr) {
        let sum = 0;
        for(let el of arr){
            sum += el.count
        }
        return sum
    }
    render() {
        const mainErrors = [500,501,502]
        const colors = {500:'yellow-bg', 501:'violet-bg',502:'blue-bg','Other':'silver-bg'}

        let data = this.props.data.filter(item => mainErrors.includes(item.code))
        const sumAll = this.sum(this.props.data)

        data.push({
            code: 'Other',
            count: sumAll - this.sum(data)
        })

        const barBlock = data.map(item => {return (
            <span style={{
                width: `${item.count *100 / sumAll}%`,
                height: '5px'
                }} className={colors[item.code]}></span>
        )})
        const detailedBlock = data.map(item => {
            return(
                    <div className={'detailed small bolder'}>
                      <span className={'rectangle '+colors[item.code]}></span>
                        <span>{item.code}: {item.count}</span>
                    </div>
            )
        })
        return (
            <div className={'error-block'}>
                <div className={'error-bar'}>
                    {barBlock}
                </div>
                <div className={'detailed-block'}>
                    {detailedBlock}
                </div>
            </div>
        )
    }
}
