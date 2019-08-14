import React from "react";
import { Icon } from "antd";
import resume from "./resume";
import moment from "moment";
import "./ShowPage.css";
const dateFormat = "YYYY-MM-DD";

const ShowPage = ({ info, setStep }) => {
  const { baseInfo = {}, companyList = [], projectList = [] } = info;
  return (
    <div className="show-page">
      <div onClick={() => setStep(1)} className="go-back">
        <Icon type="left-square" /> 返回修改信息
      </div>
      <section>
        <div className="title-2">基本信息</div>
        <div className="border-ccc grid-2">
          {resume.formJson.baseInfoConfig.map(one => {
            return (
              <div key={one.key}>
                {baseInfo[one.key] ? (
                  <RowBox title={one.label} content={baseInfo[one.key]} />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <div className="title-2">工作经验</div>
        {companyList.map(one => {
          return (
            <div className="border-ccc margin-top-10">
              <div className="display-flex justify-between">
                <RowBox title="公司名称" content={one.name} />
                <RowBox
                  title="工作时间"
                  content={`${moment(one.time[0]).format(dateFormat)}至
              ${moment(one.time[1]).format(dateFormat)}`}
                />
              </div>
              <RowBox title="工作描述" content={one.description} />
            </div>
          );
        })}
      </section>
      <section>
        <div className="title-2">项目经验</div>
        {projectList.map(one => {
          return (
            <div className="border-ccc margin-top-10">
              <div className="display-flex justify-between ">
                <RowBox title="项目名称" content={one.name} />
                <RowBox
                  title="项目时间"
                  content={`${moment(one.time[0]).format(dateFormat)}至
              ${moment(one.time[1]).format(dateFormat)}`}
                />
              </div>
              <RowBox title="项目描述" content={one.description} />
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default ShowPage;

const RowBox = ({ title, content }) => {
  return (
    <div className="row-box-line">
      <div className="title">{title}：</div>
      <div className="content">{content}</div>
    </div>
  );
};
