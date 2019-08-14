import React, { Component, Fragment } from "react";
import { Form, Input, DatePicker, Row, Col, Button, Icon } from "antd";
import "./FormDynamic.css";
const FormItem = Form.Item;
class FormDynamic extends Component {
  constructor() {
    super();
    this.state = {
      //默认值
      list: [
        {
          key: 0,
          name: "xxx",
          time: [],
          description: ""
        }
      ]
    };
  }
  //初始化
  componentDidMount() {
    const { value = [] } = this.props;
    if (value.length > 0) {
      this.setState({
        list: value
      });
    }
  }
  //删除
  deleteList = index => {
    let { list = [] } = this.state;
    list = list.filter(one => one.key === index);
    this.setState({
      list: list
    });
  };
  //添加
  addList = () => {
    let { list = [] } = this.state;
    list.push({
      key: list.length,
      name: "xxx",
      time: [],
      description: ""
    });
    this.setState({
      list: list
    });
  };
  //修改数据
  changeList = (value, key, index) => {
    console.log(key, ":", value, index);
    const { list } = this.state;
    list[index][key] = value;
    this.setState({
      list: list
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { onChange } = this.props;
        onChange && onChange(list);
      }
    });
  };
  render() {
    const { list } = this.state;
    const { baseConfig = {} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    };
    return (
      <Form {...formItemLayout} className="form-margin-left">
        <div className="add-a-style">
          <a onClick={this.addList}>添加</a>
        </div>
        {list.map((one, index) => {
          return (
            <div className="item-form">
              {/* list至少有一个才能删除 */}
              {list.length > 1 ? (
                <div className="close-div">
                  <Icon
                    type="close-square"
                    onClick={() => this.deleteList(index)}
                  />
                </div>
              ) : null}
              <FormItem label={baseConfig.name}>
                {getFieldDecorator(`name_${index}`, {
                  initialValue: one.name,
                  rules: [
                    {
                      required: true,
                      message: `请输入${baseConfig.name}`
                    }
                  ]
                })(
                  <Input
                    onChange={e =>
                      this.changeList(e.target.value, `name`, index)
                    }
                  />
                )}
              </FormItem>

              <FormItem label="时间">
                {getFieldDecorator(`time_${index}`, {
                  initialValue: one.time,
                  rules: [
                    {
                      required: true,
                      message: `请选择时间`
                    }
                  ]
                })(
                  <DatePicker.RangePicker
                    onChange={data => this.changeList(data, "time", index)}
                  />
                )}
              </FormItem>

              <FormItem label={baseConfig.description}>
                {getFieldDecorator(`description_${index}`, {
                  initialValue: one.description,
                  rules: [
                    {
                      required: true,
                      message: `请输入${baseConfig.description}`
                    }
                  ]
                })(
                  <Input.TextArea
                    rows="4"
                    onChange={e =>
                      this.changeList(e.target.value, "description", index)
                    }
                    placeholder={baseConfig.remark}
                  />
                )}
              </FormItem>
            </div>
          );
        })}
      </Form>
    );
  }
}
const WrappedFormDynamic = Form.create({ name: "formdynamic" })(FormDynamic);
export default WrappedFormDynamic;
