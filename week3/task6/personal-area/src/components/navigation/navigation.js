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
            let classNames = ''
            if(button[0] === this.props.colored){
                classNames += ' selected'
            }
            return (
                <a
                    className={classNames}
                    key={button[0]}
                    onClick={()=> { this.props.handleChosen(button[0])}}  // Getting a key of object which is good for code
                >
                    {button[1]}
                </a > // Getting a value of object which is good title

            )
        })
        return (
            <div className={'nav'}>
                {buttons}
            </div>

        )
    }
}
