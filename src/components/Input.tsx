import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  placeholder: string;
  type: "text" | "email" | "number";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
}

export const Inputs: React.FC<Props> = ({
  label,
  placeholder,
  type,
  onChange,
  onBlur,
  value,
  error,
}) => {
  return (
    <WrapperDiv>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={error ? "inpError" : ""}
      />
      {error && <label style={{ color: "red" }}>{error}</label>}
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
