import { History } from 'history';
import * as keycode from 'keycode';
import * as React from 'react';
import { HashRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
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

export class HomeComponent extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const redirectHome = () => <Redirect to='/' />;
    const renderPresentation = ((routerProps: RouteComponentProps) => 
        <Presentation
          slides={this.props.slides}
          onSlideChangeRequested={this.slideChangeHandler(routerProps.history)}
          // tslint:disable-next-line:no-string-literal
          displayedSlide={parseInt(routerProps.match.params['id'], 10)}
          nextKeyCodes={nextKeys}
          prevKeyCodes={prevKeys}
        />);

    return (<Router>
      <Switch>
        <Redirect from='/' exact={true} to='/1' />
        <Route path='/:id' render={renderPresentation} />
        <Route render={redirectHome} />
      </Switch>
    </Router>);
  }

  private slideChangeHandler(history: History) {
    return (_: number, newSlide: number) => {
      history.push({
        pathname: `/${newSlide}`
      });
    };
  }
}

export default HomeComponent;