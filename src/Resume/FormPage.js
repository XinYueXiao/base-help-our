import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import FormDynamic from "./FormDynamic";
import resume from "./resume";
const FormItem = Form.Item;
class FormPage extends Component {
  onSubmitAll = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", JSON.stringify(values));
        const { setInfo, setStep } = this.props;
        setInfo(values);
        setStep(2);
      }
    });
  };
  render() {
    const { info = {} } = this.props;
    const { companyList = [], projectList = [], baseInfo = {} } = info;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Form {...formItemLayout}>
        <div className="title-2">填写信息</div>
        {resume.formJson.baseInfoConfig.map(one => {
          return (
            <FormItem label={one.label} key={one.key}>
              {getFieldDecorator(`baseInfo.${one.key}`, {
                initialValue: baseInfo[one.key],
                rules: [
                  {
                    required: one.required !== 1,
                    message: `请输入${one.label}`
                  }
                ]
              })(<Input />)}
            </FormItem>
          );
        })}
        <FormItem label="工作经验">
          {getFieldDecorator("companyList", {
            initialValue: companyList,
            rules: [
              {
                required: true,
                message: `请填写工作经验`
              }
            ]
          })(
            <FormDynamic
              ref={form => (this.companyList = form)}
              baseConfig={resume.formJson.companyInfo}
            />
          )}
        </FormItem>
        <FormItem label="项目经验">
          {getFieldDecorator("projectList", {
            initialValue: projectList,
            rules: [
              {
                required: true,
                message: `请填写项目经验`
              }
            ]
          })(
            <FormDynamic
              ref={form => (this.projectList = form)}
              baseConfig={resume.formJson.projectInfo}
            />
          )}
        </FormItem>
        <div className="text-center">
          <Button
            onClick={this.onSubmitAll}
            type="primary"
            style={{ width: 200 }}
          >
            保存,查看结果
          </Button>
        </div>
      </Form>
    );
  }
}
const WrappedFormPage = Form.create({ name: "register" })(FormPage);
export default WrappedFormPage;
