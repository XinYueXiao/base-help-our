import React, { Component } from "react";
import "./index.css";
class TopSticky extends Component {
  render() {
    const { topComponent } = this.props;
    const _TopSticky = document.getElementById("js-top-sticky-id");
    const TSHeight = _TopSticky && _TopSticky.clientHeight();
    return (
      <div className="top-sticky-box">
        <div className="top-sticky" id="js-top-sticky-id">
          {topComponent}
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
export default TopSticky;
