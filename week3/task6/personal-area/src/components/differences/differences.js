import React, {Component} from 'react'
import '../differences/differences.css'
import {difference, divideDigits} from "../../services/compute";

export default class Differences extends Component{
    render() {
        const data = this.props.data
        const img = data.img
        const income = difference(data.prev,data.cur)
        let incomeClasses = 'income-block',
            labelClasses = 'label bolder',
            circleClasses = 'circle',
            incomeTxt,
            prev = divideDigits(data.prev),
            cur = divideDigits(data.cur)
        if(income){
            incomeTxt = income.toFixed(2)
        }
        if(income > 0) {
            incomeClasses += ' green-bg'
            circleClasses += ' green-bg'
        }
        else {
            incomeClasses += ' corral-bg'
            labelClasses += ' corral'
            circleClasses += ' corral-bg'
        }

        return (
            <div className={'diff'}>
                <div>
                    <img src={img} alt={'some'}/>
                    <span className={circleClasses}></span>
                </div>
                <div className={'diff-div'}>
                    <div>
                        <span className={labelClasses}>{data.label}</span>
                        <span className={incomeClasses}>{incomeTxt}%</span>
                    </div>
                    <p>{cur}</p>
                    <p className={'silver'}>{prev}</p>
                </div>

            </div>
        )
    }
}
