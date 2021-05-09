import React, {Component} from 'react'
import '../headerInfo/headerInfo.css'
export default class HeaderInfo extends Component{
    render() {
        const data = this.props.data

        const dataBlock = Object.keys(data).map(function(key, index) {
            const capitalizedKey =  key[0].toUpperCase() + key.slice(1);
            return (
                    <div className={'header-info__item'}>
                        <div className={'header-info__circle-wrapper'}>
                            <span className={'circle green-bg'}></span>
                        </div>
                        <span className={'header-info__item-title bolder'}>{capitalizedKey}: {data[key].toFixed(2)}%</span>
                    </div>
            )
        });
        return <div className={'header-info'}>
            {dataBlock}
        </div>
    }
}
