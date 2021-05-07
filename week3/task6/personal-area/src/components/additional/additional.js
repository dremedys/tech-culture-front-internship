import React, {Component} from 'react'
import '../additional/additional.css'
export default class Additional extends Component{
    render() {
        const data = this.props.data

        const percents = data.percents.map(item => {
            return <p key={item.label} className={'bolder'}>{item.label}: {item.content.toFixed(2)}%</p>
        })

        const helps = data.helps.map(item => {
            return <span key={item} className={'blue small'}>{item} </span>
        })
        return (
            <div className={'additional'}>
                {percents}
                <p className={'silver small'}>{data.text}</p>
                <div className={'small'}>
                    Help: {helps}</div>

            </div>
        )
    }
}
