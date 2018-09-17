import 'normalize.css';
import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./Home";
import './index.css';
import { SourceTransformer } from "./parser";

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
