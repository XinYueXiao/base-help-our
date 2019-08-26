import React from "react";
import ReactDOM from "react-dom";
import TreeTransfer from "./TreeTransfer";
import dataJson from "./dataJson";
import MoreOperate from "./MoreOperate";
import CInputNumber from "./CInputNumber";
import CircleLinear from "./CircleLinear";
import Resume from "./Resume";
import { InputNumber, Collapse } from "antd";
import "antd/dist/antd.css";
import "./index.css";
const { Panel } = Collapse;
class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Collapse defaultActiveKey={["1", "5"]}>
          <Panel header="输入必须为数字(核心：正则表达式过滤可用字符)" key="5">
            <div>
              俺的： <CInputNumber max={100} falseErrorMessage="不超过100" />
            </div>
            <br />
            <div>
              官方： <InputNumber max={100} />
            </div>
          </Panel>
          <Panel header="隐藏更多，点击显示(核心：宽度的监控) " key="1">
            <section className="more-operate-section">
              <MoreOperate lineHight={30} textMore="更多">
                {[
                  ...dataJson.hotCity,
                  ...dataJson.hotCity,
                  ...dataJson.hotCity
                ].map((one, index) => (
                  <div key={index} className="item-title">
                    {one.title}
                  </div>
                ))}
              </MoreOperate>
            </section>
          </Panel>
          <Panel header="动态操作Form生成简历(核心：Form)" key="2">
            <section>
              <Resume />
            </section>
          </Panel>
          <Panel header="树形穿梭框(核心：数据选中/取消同步)" key="3">
            <TreeTransfer
              options={dataJson.hotCity}
              onClickCancel={() => console.log("隐藏")}
              onOkClick={list => console.log("保存的筛选项", list)}
            />
          </Panel>
          <Panel header="线性环形渐变(核心：偷换概念)" key="4">
            <section className="more-operate-circle">
              <CircleLinear
                color={["#5effff", "#309bff"]}
                lineWidth="4px"
                width="200px"
                height="200px"
              >
                <img
                  src="http://s6.sinaimg.cn/mw690/0071fbiQzy7jQiKE0Pb45&690"
                  width="180"
                  height="180"
                  alt="头像"
                />
              </CircleLinear>
            </section>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
