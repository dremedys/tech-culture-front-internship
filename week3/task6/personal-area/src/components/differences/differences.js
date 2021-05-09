import React, {Component} from 'react'
import '../differences/differences.css'
import {difference, divideDigits} from "../../services/compute";

export default class Differences extends Component{
    render() {
        const data = this.props.data,
            img = data.img,
            income = difference(data.prev,data.cur)

        let incomeClasses = 'differences__income-block',
            labelClasses = 'label bolder',
            circleClasses = 'circle',
            incomeTxt,
            prev = divideDigits(data.prev),
            cur = divideDigits(data.cur)

        if(income){
            incomeTxt = Math.round(income)
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
            <div className={'differences'}>
                <div className={'differences__icon'}>
                    <img src={img} alt={'difference icon'}/>
                    <div className={'differences__circle-wrapper'}>
                        <span className={circleClasses}></span>
                    </div>
                </div>
                <div className={'differences__main'}>
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
