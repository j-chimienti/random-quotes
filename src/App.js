import React, {Component} from 'react';
import './App.css';

import {quotes, backgroundClasses} from './quotes';

import sample from 'lodash/sample';


import {Button, Grid, Panel, Row} from 'react-bootstrap'


class App extends React.Component {


    constructor(props) {

        super();

        this.state = {
            quotes,
            currentQuote: sample(quotes),
            history: [],
            backgroundGradient: sample(backgroundClasses),
        };

        this.newQuote = this.newQuote.bind(this);

    }

    componentDidMount() {

        document.addEventListener('keydown', (e) => {


            // keyCode or which

            if (e.keyCode === 39) {

                this.newQuote();
            }
        })
    }


    newQuote() {


        const {
            history,
            currentQuote,
            quotes,
            backgroundGradient
        } = this.state;

        const updatedHistory = [...history, currentQuote];

        let newQuote_ = sample(quotes);


        while (updatedHistory
            .slice(-5)
            .find(h => h === newQuote_)) {

            newQuote_ = sample(quotes);
        }


        const newGradient = changeBackground();

        this.setState({
            ...this.state,
            currentQuote: newQuote_,
            history: updatedHistory,
            backgroundGradient: newGradient,
        });

        function changeBackground() {

            let newGradient = newBackground();

            while (backgroundGradient === newGradient) {

                newGradient = newBackground();
            }

            return newGradient;

            function newBackground() {

                return sample(backgroundClasses);
            }

        }


    }


    render() {

        const {backgroundGradient, currentQuote: {quote, author}} = this.state;

        const author_ = <span>
            <i className={'fa fa-pencil'}></i>
            {' '}
            {author}
        </span>
        return (
            <div className={backgroundGradient + ' app text-center container-fluid'}

            >

                <Grid>
                    <Row className={'quote_display'}>
                        <Panel header={author_}>

                            <i className={'fa fa-quote-left'}></i>
                            {' '}
                            {quote}
                        </Panel>
                    </Row>
                </Grid>


                <Button
                    bsStyle={'primary'}
                    bsSize={'large'}
                    onClick={this.newQuote}
                    className={"new_quote_btn"}
                >

                    <i className={'fa fa-arrow-right fa-2x'}></i>
                </Button>

            </div>
        );
    }
}


export default App;
