import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {quotes, backgroundClasses} from './quotes';

import _ from 'lodash';

class App extends React.Component {


    constructor(props) {

        super();

        this.state = {
            quotes,
            currentQuote: _.sample(quotes),
            history: [],
            backgroundGradient: _.sample(backgroundClasses),
        };

        this.changeBackground = this.changeBackground.bind(this);
        this.newQuote = this.newQuote.bind(this);
        this.newBackground = this.newBackground.bind(this);
        this.randomQuote = this.randomQuote.bind(this);

    }

    changeBackground() {

        let newGradient = this.newBackground();

        while (this.state.backgroundGradient === newGradient) {

            newGradient = this.newBackground();
        }


        this.setState({
            backgroundGradient: newGradient,
        })
    }

    newBackground() {

        return _.sample(backgroundClasses);
    }

    newQuote() {


        const updatedHistory = [...this.state.history, this.state.currentQuote];

        let newQuote_ = this.randomQuote();


        while (updatedHistory
            .slice(-5)
            .find(h => h === newQuote_)) {

            newQuote_ = this.randomQuote();
        }


        this.setState({
            ...this.state,
            currentQuote: newQuote_,
            history: updatedHistory,
        });
        this.changeBackground();
    }

    randomQuote() {

        return _.sample(this.state.quotes);
    }

    render() {
        return (
            <div className={this.state.backgroundGradient + ' app text-center container-fluid'}

            >

                <section className="fdb-block">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-8 text-center">
                                <p className="text-h2">

                                    {this.state.currentQuote.quote}


                                </p>

                                <p
                                    className={'text-h3'}
                                >
                                    {this.state.currentQuote.author}
                                </p>

                                <p className="mt-5 mt-sm-4">
                                    <button
                                        className={'btn'}
                                        onClick={this.newQuote}
                                    >

                                        new quote
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}


export default App;
