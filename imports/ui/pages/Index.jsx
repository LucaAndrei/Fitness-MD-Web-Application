import React from 'react';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/Index";

export default class Index extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div className = "content-scrollable">
                <h1>Index</h1>
            </div>

        )
    }
}