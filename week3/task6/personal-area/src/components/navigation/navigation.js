import React, {Component} from 'react'
import '../navigation/navigation.css'
const actives = {
    last_hour : 'Last hour',
    today: 'Today',
    yesterday: 'Yesterday',
    last_3days: 'Last three days'
}
export default class Navigation extends Component{
    render() {
        const buttons = Object.entries(actives).map(button => {
            const keyName = button[0],
                valueName = button[1]
            let classNames = 'navigation__item'

            if(keyName === this.props.colored){
                classNames += ' navigation__item--selected'
            }
            return (
                <a
                    className={classNames}
                    key={keyName}
                    onClick={()=> { this.props.handleChosen(keyName)}}
                >
                    {valueName}
                </a >

            )
        })
        return (
            <div className={'navigation'}>
                {buttons}
            </div>
        )
    }
}
