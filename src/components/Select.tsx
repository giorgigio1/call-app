import React from "react";
import styled from "styled-components";
import { useField } from "formik";

interface Props {
  label: string;
  name: string;
}

export const Select: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <WrapperDiv>
      <label>{label}</label>
      <select
        {...props}
        {...field}
        className={meta.error && meta.touched ? "inpError" : ""}
      >
        <option hidden>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {meta.error && meta.touched && (
        <label style={{ color: "red" }}>{meta.error}</label>
      )}
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 10px;
  & select {
    width: 130px;
    padding: 10px 10px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #bcbcbc;
  }
`;
