import { Modal } from "antd";
import { Inputs } from "./Input";
import { Select } from "./Select";
import { useState, ChangeEvent } from "react";
import { Person } from "../type";

interface Props {
  editPersonModalOpen: boolean;
  setEditPersonModalOpen: (isOpen: boolean) => void;
  dataSource: Person[];
  setDataSource: (data: Person[]) => void;
  editPerson: Person | null;
}

export const EditPersonModal: React.FC<Props> = ({
  editPersonModalOpen,
  setEditPersonModalOpen,
  dataSource,
  setDataSource,
  editPerson,
}) => {
  const [id] = useState(editPerson?.id || "");
  const [name, setName] = useState(editPerson?.name || "");
  const [email, setEmail] = useState(editPerson?.email || "");
  const [gender, setGender] = useState(editPerson?.gender || "");
  const [street, setStreet] = useState(editPerson?.address.street || "");
  const [city, setCity] = useState(editPerson?.address.city || "");
  const [phone, setPhone] = useState(editPerson?.phone || "");

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

    const updatedPerson = {
      id,
      name,
      email,
      gender,
      address: {
        street,
        city,
      },
      phone,
    };

    if (editPerson) {
      const newData = dataSource.map((item) => {
        if (item.id === updatedPerson?.id) {
          return updatedPerson;
        }
        return item;
      });
      setDataSource(newData);
    }
    setEditPersonModalOpen(false);
  };

  return (
    <>
      <form>
        <Modal
          title="Add Person"
          // centered
          open={editPersonModalOpen}
          onOk={() => handleSubmit()}
          onCancel={() => setEditPersonModalOpen(false)}
          width={800}
        >
          <Inputs
            label="Name"
            placeholder="Enter the name"
            type="text"
            onChange={handleNameChange}
            onBlur={handleNameChange}
            value={name}
            error={nameError}
          />
          <Inputs
            label="Email"
            placeholder="Enter the email"
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
            placeholder="Enter the street"
            onChange={handleStreetChange}
            onBlur={handleStreetChange}
            value={street}
            error={streetError}
          />
          <Inputs
            label="City"
            type="text"
            placeholder="Enter the city"
            onChange={handleCityChange}
            onBlur={handleCityChange}
            value={city}
            error={cityError}
          />
          <Inputs
            label="Phone"
            type="text"
            placeholder="Enter the phone"
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
