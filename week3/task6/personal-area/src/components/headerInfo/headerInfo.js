import React, {Component} from 'react'
import '../headerInfo/headerInfo.css'
import {Badge} from "@material-ui/core";
export default class HeaderInfo extends Component{
    render() {
        const data = this.props.data

        const dataBlock = Object.keys(data).map(function(key, index) {
            const capitalizedKey =  key[0].toUpperCase() + key.slice(1);
            return (
                <Badge key={key[0]} color="secondary" overlap="rectangle" badgeContent=" " variant="dot"  anchorOrigin={{
                    vertical: "top",
                    horizontal: 'left',
                }}>
                    <div className={'badge bolder'}>{capitalizedKey}: {data[key].toFixed(2)}%</div>
                </Badge>
            )
        });

        return <div className={'header-info'}>
            {dataBlock}
        </div>
    }
}
