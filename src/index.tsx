import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "./Home";
import { SourceTransformer } from "./parser";

const parser = new SourceTransformer();
const slides = parser.parse("");

ReactDOM.render(
  <Home
    slides={slides.map((slide, index) => (
      <div key={`slide-${index}`} dangerouslySetInnerHTML={{ __html: slide }} />
    ))}
  />,
  document.getElementById("root") as HTMLElement
);
