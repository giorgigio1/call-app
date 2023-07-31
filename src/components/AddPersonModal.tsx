import { Modal } from "antd";
import { Inputs } from "./Input";
import { Select } from "./Select";
import { useState, ChangeEvent } from "react";
import { Person } from "../type";

interface Props {
  addPersonModalOpen: boolean;
  setAddPersonModalpen: (isOpen: boolean) => void;
  dataSource: Person[];
  setDataSource: (data: Person[]) => void;
}

export const AddPersonModal: React.FC<Props> = ({
  addPersonModalOpen,
  setAddPersonModalpen,
  dataSource,
  setDataSource,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    if (value.length === 0) {
      setNameError("Name is Required");
    } else if (value.length === 1) {
      setNameError("The name must be at least 2 characters");
    } else {
      setNameError("");
    }
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const value = event.target.value;
    setEmail(value);
    if (value.length === 0) {
      setEmailError("Email is Required");
    } else if (!regex.test(value)) {
      setEmailError("Should look like an email address");
    } else {
      setEmailError("");
    }
  };
  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGender(value);
    setGenderError(value === "Select Gender" ? "Gender is required" : "");
  };
  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStreet(value);
    if (value.length === 0) {
      setStreetError("Street is Required");
    } else if (value.length === 1) {
      setStreetError("The street must be at least 2 characters");
    } else {
      setStreetError("");
    }
  };
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCity(value);
    if (value.length === 0) {
      setCityError("City is Required");
    } else if (value.length === 1) {
      setCityError("The city must be at least 2 characters");
    } else {
      setCityError("");
    }
  };
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^(\+?995)(79\d{7}|5\d{8})$/;
    const value = event.target.value;
    setPhone(value);

    if (value.length === 0) {
      setPhoneError("Phone is Required");
    } else if (!regex.test(value)) {
      setPhoneError(
        "Please enter georgian mobile phone number (+995 5** *** ***)"
      );
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!name || nameError) {
      setNameError("Invalid Name");
      hasError = true;
    }
    if (!email || emailError) {
      setEmailError("Invalid Email");
      hasError = true;
    }
    if (!gender || genderError) {
      setGenderError("Invalid Genre");
      hasError = true;
    }
    if (!street || streetError) {
      setStreetError("Invalid Street");
      hasError = true;
    }
    if (!city || cityError) {
      setCityError("Invalid City");
      hasError = true;
    }
    if (!phone || phoneError) {
      setPhoneError("Invalid Phone");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    const newPerson = {
      id: Math.random(),
      name,
      email,
      gender,
      address: {
        street,
        city,
      },
      phone,
    };

    setDataSource([...dataSource, newPerson]);

    setAddPersonModalpen(false);
  };

  return (
    <>
      <form>
        <Modal
          title="Add Person"
          // centered
          open={addPersonModalOpen}
          onOk={() => handleSubmit()}
          onCancel={() => setAddPersonModalpen(false)}
          width={800}
        >
          <Inputs
            label="Name"
            placeholder="name"
            type="text"
            onChange={handleNameChange}
            onBlur={handleNameChange}
            value={name}
            error={nameError}
          />
          <Inputs
            label="Email"
            placeholder="email"
            type="email"
            onChange={handleEmailChange}
            onBlur={handleEmailChange}
            value={email}
            error={emailError}
          />
          <Select
            label="Gender"
            onChange={handleGenderChange}
            onBlur={handleGenderChange}
            value={gender}
            error={genderError}
          />
          <Inputs
            label="Street"
            type="text"
            placeholder="street"
            onChange={handleStreetChange}
            onBlur={handleStreetChange}
            value={street}
            error={streetError}
          />
          <Inputs
            label="City"
            type="text"
            placeholder="city"
            onChange={handleCityChange}
            onBlur={handleCityChange}
            value={city}
            error={cityError}
          />
          <Inputs
            label="Phone"
            type="number"
            placeholder="phone"
            onChange={handlePhoneChange}
            onBlur={handlePhoneChange}
            value={phone}
            error={phoneError}
          />
        </Modal>
      </form>
    </>
  );
};
