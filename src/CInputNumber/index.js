import React, { Component } from "react";
import { InputNumber, Popover } from "antd";
import "./index.css";
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
    const { falseErrorMessage, max } = this.props;
    const InputNumberCom = (
      <InputNumber
        {...this.props}
        formatter={this.formatter}
        onChange={this.onChange}
        value={this.state.value}
      />
    );
    return falseErrorMessage && this.state.value > max ? (
      <Popover
        content={falseErrorMessage}
        overlayClassName="popover-red-color"
        trigger="focus"
      >
        {InputNumberCom}
      </Popover>
    ) : (
      InputNumberCom
    );
  }
}
