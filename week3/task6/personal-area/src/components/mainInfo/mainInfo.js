import React, {Component} from 'react'
import Differences from "../differences/differences";
import Additional from "../additional/additional";
import '../mainInfo/mainInfo.css'
export default class MainInfo extends Component{

    render() {
        const {differences,additional} = this.props.data
        return (
            <div className={'main-info'}>
                <Differences data={differences}></Differences>
                <Additional data={additional}></Additional>
            </div>

        )
    }
}
