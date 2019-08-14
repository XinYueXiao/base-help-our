import React from "react";
import ReactDOM from "react-dom";
import TreeTransfer from "./TreeTransfer";
import dataJson from "./dataJson";
import MoreOperate from "./MoreOperate";
import CInputNumber from "./CInputNumber";
import CircleLinear from "./CircleLinear";
import Resume from "./Resume";

import { InputNumber } from "antd";

import "antd/dist/antd.css";
import "./index.css";
class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Resume />
        <section className="more-operate-section">
          <article>
            <h1>隐藏更多，点击显示 </h1>
            <em>核心：宽度的监控</em>
          </article>
          <MoreOperate lineHight={30} textMore="更多">
            {[
              ...dataJson.hotCity,
              ...dataJson.hotCity,
              ...dataJson.hotCity
            ].map((one, index) => (
              <div key={index} class="item-title">
                {one.title}
              </div>
            ))}
          </MoreOperate>
        </section>

        <section>
          <article>
            <h1>树形穿梭框 </h1>
            <em>核心：数据的流转，数据选中/取消同步</em>
          </article>
          <TreeTransfer
            options={dataJson.hotCity}
            onClickCancel={() => console.log("隐藏")}
            onOkClick={list => console.log("保存的筛选项", list)}
          />
        </section>

        <section className="more-operate-circle">
          <article>
            <h1>线性环形渐变 </h1>
            <em>核心：偷换概念</em>
          </article>
          <CircleLinear
            color={["#5effff", "#309bff"]}
            lineWidth="4px"
            width="260px"
            height="260px"
          >
            <img
              src="http://s6.sinaimg.cn/mw690/0071fbiQzy7jQiKE0Pb45&690"
              width="240"
              height="240"
              alt="头像"
            />
          </CircleLinear>
        </section>

        <section>
          <article>
            <h1>输入必须为数字 </h1>
            <em>核心：正则表达式过滤可用字符</em>
            <div>
              俺的： <CInputNumber max={100} />
            </div>
            <br />
            <div>
              官方： <InputNumber max={100} />
            </div>
          </article>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
