import React from "react";
import { Button } from "antd";

const ShowPage = ({ info, setStep }) => {
  console.log(info);
  return (
    <div>
      <Button type="primary" onClick={() => setStep(1)}>
        返回修改信息
      </Button>
    </div>
  );
};
export default ShowPage;
