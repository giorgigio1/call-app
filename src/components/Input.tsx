import React, { FocusEvent } from "react";
import styled from "styled-components";
import { useField } from "formik";

interface Props {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "number";
  name: string;
}

export const Inputs: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <WrapperDiv>
      <label>{label}</label>
      <input
        {...props}
        {...field}
        className={meta.touched && meta.error ? "inpError" : ""}
      />
      {meta.touched && meta.error && (
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
  & input {
    padding: 10px 10px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #bcbcbc;
  }
`;
