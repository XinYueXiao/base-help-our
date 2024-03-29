import React, { Component } from "react";
import "./index.css";
class CircleLinear extends Component {
  render() {
    const { lineWidth = "3px", color = [], width, height } = this.props;
    return (
      <div
        className="circle-color"
        style={{
          width: width,
          height: height,
          backgroundImage: `linear-gradient(180deg, ${color[0]} 0%, ${
            color[1]
          } 100%)`,
          padding: lineWidth
        }}
      >
        <div className="radius-box">{this.props.children}</div>
      </div>
    );
  }
}
export default CircleLinear;
