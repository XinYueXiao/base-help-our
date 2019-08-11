import React from "react";
import ReactDOM from "react-dom";
import TreeTransfer from "./TreeTransfer";
import dataJson from "./dataJson";
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
