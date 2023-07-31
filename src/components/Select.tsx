import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string | "male" | "female";
  error: string;
}

export const Select: React.FC<Props> = ({
  label,
  onChange,
  onBlur,
  value,
  error,
}) => {
  return (
    <WrapperDiv>
      <label>{label}</label>
      <select
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={error ? "inpError" : ""}
      >
        <option hidden>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {error && <label style={{ color: "red" }}>{error}</label>}
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
