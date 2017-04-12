import React from 'react';

export default class Footer extends React.Component {
    render() {
        return(
            <footer>
                <a className="y-logo f-elem" href="http://y-kampus.fi" target="_blank">
                    <img src="./images/y-kampus-small.png" alt=""/>
                </a>

                <span className="copyright f-elem">
                    © 2017 <a href="https://github.com/anttispitkanen" target="_blank">Antti Pitkänen</a>
                </span>
            </footer>
        )
    }
}
