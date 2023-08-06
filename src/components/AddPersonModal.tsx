import { Modal } from "antd";
import { Person } from "../type";
import { Inputs } from "./Input";
import { Select } from "./Select";
import { Formik } from "formik";
import { schema } from "../ValidationSchema/schema";

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
  const onSubmit = (person: Person) => {
    const newPerson = {
      id: Math.random(),
      name: person.name,
      email: person.email,
      gender: person.gender,
      address: {
        street: person.address.street,
        city: person.address.city,
      },
      phone: person.phone,
    };

    setDataSource([...dataSource, newPerson]);

    setAddPersonModalpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          id: Math.random(),
          name: "",
          email: "",
          gender: "",
          address: {
            street: "",
            city: "",
          },
          phone: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Modal
            title="Add Person"
            // centered
            open={addPersonModalOpen}
            onOk={() => handleSubmit()}
            onCancel={() => setAddPersonModalpen(false)}
            width={800}
          >
            <Inputs label="Name" type="text" placeholder="name" name="name" />
            <Inputs
              label="Email"
              type="email"
              placeholder="email"
              name="email"
            />
            <Select label="Gender" name="gender" />
            <Inputs
              label="Street"
              type="text"
              placeholder="street"
              name="address.street"
            />
            <Inputs
              label="City"
              type="text"
              placeholder="city"
              name="address.city"
            />
            <Inputs
              label="Phone"
              type="number"
              placeholder="phone"
              name="phone"
            />
          </Modal>
        )}
      </Formik>
    </>
  );
};
