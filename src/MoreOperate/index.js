/**
 * 更多组件
 * @param
	boxFatherId: 父级容器ID,
 */
import React, { Component } from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";
class MoreOperate extends Component {
  static propTypes = {
    lineHight: PropTypes.number.isRequired,
    textMore: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isTop: false,
      isShowMoreText: false
    };
  }
  componentDidMount = () => {
    this.showMore();
  };
  componentWillUnmount() {}
  showMore = () => {
    // const { textMore } = this.props
    // const moreTextWidth = textMore.length * 12 + 10;
    const parent = this.parent.offsetWidth;
    // const children = this.children.offsetWidth
    const childNodes = this.children.childNodes;
    let childWidth = 0;
    for (let index = 0; index < childNodes.length; index++) {
      const element = childNodes[index];
      childWidth += element.offsetWidth + 8;
    }
    this.setState({
      isShowMoreText: parent <= childWidth
    });
  };
  changeIsTop = () => {
    const { isTop } = this.state;
    this.setState({
      isTop: !isTop
    });
  };
  render() {
    const { isTop, isShowMoreText } = this.state;
    const { textMore = "更多", lineHight } = this.props;
    return (
      <div
        ref={e => (this.parent = e)}
        style={{
          position: "relative",
          height: isTop ? "auto" : lineHight,
          overflow: "hidden"
        }}
      >
        <div
          ref={e => (this.children = e)}
          style={{
            width: isShowMoreText ? "94%" : "",
            float: "left",
            height: isTop ? "auto" : lineHight
          }}
        >
          {this.props.children}
        </div>
        {isShowMoreText ? (
          <div style={{ position: "absolute", right: 0 }}>
            <a onClick={this.changeIsTop}>
              {textMore}
              <Icon type={isTop ? "up" : "down"} theme="outlined" />
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MoreOperate;
