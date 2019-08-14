import React, { useState } from "react";
import FormPage from "./FormPage";
import ShowPage from "./ShowPage";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [info, setInfo] = useState({});
  const [step, setStep] = useState(1);

  const stepMap = {
    1: <FormPage info={info} setInfo={setInfo} setStep={setStep} />,
    2: <ShowPage info={info} setStep={setStep} />
  };
  return <div>{stepMap[step]}</div>;
}
export default Example;
