import React, { Component } from "react";
import { InputNumber } from "antd";

export default class CInputNumber extends Component {
  //数据校验
  formatter = value => {
    if (/^(0?|[1-9][0-9]*)+(\.[0-9]*)?$/.test(value)) {
      this.preValue = value;
      return value;
    }
    return this.preValue;
  };
  onChange = value => {
    if (!("value" in this.props)) {
      this.setState({ value });
    }
    this.props.onChange && this.props.onChange(value);
  };

  constructor(props) {
    super(props);
    const value = props.value;
    this.preValue = value;
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    return (
      <InputNumber
        {...this.props}
        formatter={this.formatter}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
  }
}
