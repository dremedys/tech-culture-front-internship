import React, {Component} from 'react'
import '../main/main.css'
import Navigation from "../navigation/navigation";
import DataPage from "../dataPage/DataPage";

export default class Main extends Component{

    state = {
        chosen: 'yesterday'
    }
    handleChosen = (chosen) => {
        this.setState({chosen})
    }
    render() {
        const chosen = this.state.chosen
        return(
            <div className={'main'}>
                <h1 className={'main__title'}>Main metrics</h1>
                <Navigation colored={this.state.chosen} handleChosen = {this.handleChosen} ></Navigation>
                <DataPage chosen={chosen}></DataPage>
            </div>
        )
    }
}
