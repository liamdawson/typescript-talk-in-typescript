import * as React from 'react';

export interface IProps {
    onSlideChangeRequested?: (oldNumber: number, newNumber: number) => void,
    displayedSlide: number,
    nextKeyCodes?: number[],
    prevKeyCodes?: number[],
    slides: JSX.Element[],
}

export class PresentationComponent extends React.Component<IProps> {
    private inputHandler: (event: Event) => void;

    public render() {
        const { slides, displayedSlide } = this.props;

        return (
            <div className='Presentation'>
                {slides.map((slide, slideIndex) => <div
                    key={`slideContent-${slideIndex}`}
                    className={`Presentation-slide Presentation-slide--${slideIndex + 1 === displayedSlide ? 'current' : 'hidden'}`}>
                        {slide}
                    </div>)}
            </div>
        );
    }

    public componentDidMount() {
        this.inputHandler = this.onDocumentKeyPress.bind(this);

        document.addEventListener('keyup', this.inputHandler);
    }

    public componentWillUnmount() {
        document.removeEventListener('keyup', this.inputHandler);
    }

    private tryChangeSlide(change: number) {
        const { displayedSlide, slides, onSlideChangeRequested } = this.props;

        if (!slides) {
            return;
        }

        // reminder: slides are 1-indexed
        if (displayedSlide + change > slides.length) {
            return;
        }

        if (displayedSlide + change < 1) {
            return;
        }

        if (onSlideChangeRequested) {
            onSlideChangeRequested(displayedSlide, displayedSlide + change);
        }
    }

    private onDocumentKeyPress(e: Event) {
        if (e instanceof KeyboardEvent) {
            if (this.props.nextKeyCodes && this.props.nextKeyCodes.indexOf(e.keyCode) !== -1) {
                e.preventDefault();
                this.tryChangeSlide(+1);
            } else if(this.props.prevKeyCodes && this.props.prevKeyCodes.indexOf(e.keyCode) !== -1) {
                e.preventDefault();
                this.tryChangeSlide(-1);
            }
        }
    }
}

export default PresentationComponent;
