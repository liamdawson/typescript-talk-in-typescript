import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./Home";
import { SourceTransformer } from "./parser";

import 'normalize.css';
import './index.css';

import './code.css';
import './presentation.css';

const parser = new SourceTransformer();

fetch("./presentation.md")
  .then(resp => resp.text())
  .then(md => parser.parse(md))
  .then(slides => {
    ReactDOM.render(
      <Home
        slides={slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            dangerouslySetInnerHTML={{ __html: slide }}
          />
        ))}
      />,
      document.getElementById("root") as HTMLElement
    );
  });
