import * as React from 'react';

export class PresentationComponent extends React.Component {
    private inputHandler: (event: Event) => void;

    public render() {
        return <div />;
    }

    public componentDidMount() {
        this.inputHandler = this.onDocumentKeyPress.bind(this);

        document.addEventListener('keyup', this.inputHandler);
        document.addEventListener('mousewheel', this.inputHandler);
    }

    public componentWillUnmount() {
        document.removeEventListener('keyup', this.inputHandler);
        document.removeEventListener('mousewheel', this.inputHandler);
    }

    private onDocumentKeyPress() {

    }
}

export default PresentationComponent;
