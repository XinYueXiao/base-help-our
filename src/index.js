import React from "react";
import ReactDOM from "react-dom";
import TreeTransfer from "./TreeTransfer";
import dataJson from "./dataJson";
import MoreOperate from "./MoreOperate";
import "antd/dist/antd.css";
import "./index.css";
class App extends React.Component {
  render() {
    return (
      <div className="demo">
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
