import * as React from 'react';

export interface IProps {
    startingSlide?: number,
    nextKeyCodes?: number[],
    prevKeyCodes?: number[],
}

interface IState {
    currentSlideNumber: number;
}

export class PresentationComponent extends React.Component<IProps, IState> {
    private inputHandler: (event: Event) => void;

    constructor(props: IProps) {
        super(props);
        this.state = {
            currentSlideNumber: this.props.startingSlide
                ? this.props.startingSlide
                : 1,
        };
    }

    public render() {
        return <div>
            {this.state.currentSlideNumber}
        </div>;
    }

    public componentDidMount() {
        this.inputHandler = this.onDocumentKeyPress.bind(this);

        document.addEventListener('keyup', this.inputHandler);
        // document.addEventListener('mousewheel', this.inputHandler);
    }

    public componentWillUnmount() {
        document.removeEventListener('keyup', this.inputHandler);
        // document.removeEventListener('mousewheel', this.inputHandler);
    }

    private onDocumentKeyPress(e: Event) {
        if (e instanceof KeyboardEvent) {
            if (this.props.nextKeyCodes && this.props.nextKeyCodes.indexOf(e.keyCode) !== -1) {
                this.setState({currentSlideNumber: this.state.currentSlideNumber + 1});
            } else if(this.props.prevKeyCodes && this.props.prevKeyCodes.indexOf(e.keyCode) !== -1) {
                this.setState({currentSlideNumber: this.state.currentSlideNumber - 1});
            }
        }
    }
}

export default PresentationComponent;
