import * as keycode from 'keycode';
import * as React from 'react';
import Presentation from './Presentation';

const nextKeys = [
  keycode.codes.down,
  keycode.codes["page down"],
  keycode.codes.right,
  keycode.codes.space,
];
const prevKeys = [
  keycode.codes.left,
  keycode.codes["page up"],
  keycode.codes.up,
  keycode.codes.backspace,
];

interface IProps {
  slides: JSX.Element[],
}

interface IState {
  currentSlide: number,
}

export class HomeComponent extends React.Component<IProps, IState> {
  private slideChangeHandler: (_: number, newSlide: number) => void;

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentSlide: 1,
    }
    this.slideChangeHandler = this.handleSlideChange.bind(this);
  }

  public render() {
    return <Presentation
      slides={this.props.slides}
      onSlideChangeRequested={this.slideChangeHandler}
      displayedSlide={this.state.currentSlide}
      nextKeyCodes={nextKeys}
      prevKeyCodes={prevKeys}
    />;
  }

  private handleSlideChange(_: number, newSlide: number) {
    this.setState({
      currentSlide: newSlide,
    });
  }
}

export default HomeComponent;