import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CardOfProviderComponent from './CardOfProviderComponent';
// import './css/ModalWindow.css';

const modalRoot = document.getElementById('modalWindow');
console.log(modalRoot)

function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet.hasOwnProperty('cssRules')) { // true for inline styles
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach(cssRule => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) { // true for stylesheets loaded from a URL
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}

class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div'); // STEP 1: create an empty div
        this.modalRoot = document.getElementById('modalWindow');
        // this.externalWindow = null;
    }

    // componentDidMount() {
    //     // STEP 3: open a new browser window and store a reference to it
    //     this.externalWindow = window.open('', '');
    //     // this.externalWindow = window.open('', '', 'width=1000,height=600,left=900,top=70');      // откроет окно
    //     // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    //     this.externalWindow.document.body.appendChild(this.containerEl);
    //
    //     this.externalWindow.document.title = 'Карточка контрагента';
    //
    //     // update the state in the parent component if the user closes the
    //     // new window
    //     copyStyles(document, this.externalWindow.document);
    //     this.externalWindow.addEventListener('beforeunload', () => {
    //         this.props.closeWindowPortal();
    //     });
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.modalWindowFocus && this.props.modalWindowFocus !== prevProps.modalWindowFocus) {
    //         this.externalWindow.focus();
    //         this.props.modalWindowFocusOff();
    //     }
    // }

    // componentWillUnmount() {
    //     // This will fire when this.state.showWindowPortal in the parent component becomes false
    //     // So we tidy up by just closing the window
    //     this.externalWindow.close();
    // }

    componentDidMount() {
        this.modalRoot.appendChild(this.containerEl);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.containerEl);
    }

    render() {
        // this.externalWindow.focus();
        // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
        return ReactDOM.createPortal(
            this.props.children,
            this.containerEl
        );
    }
}

export default ModalWindow;