import { Modal } from "antd";
import { Inputs } from "./Input";
import { Select } from "./Select";
import { Person } from "../type";
import { Formik } from "formik";
import { schema } from "../ValidationSchema/schema";

interface Props {
  editPersonModalOpen: boolean;
  setEditPersonModalOpen: (isOpen: boolean) => void;
  dataSource: Person[];
  setDataSource: any;
  editPerson: Person;
}

export const EditPersonModal: React.FC<Props> = ({
  editPersonModalOpen,
  setEditPersonModalOpen,
  dataSource,
  setDataSource,
  editPerson,
}) => {
  const onSubmit = (person: Person) => {
    console.log("person", person);
    const updatedPerson = {
      id: person.id,
      name: person.name,
      email: person.email,
      gender: person.gender,
      address: {
        street: person.address.street,
        city: person.address.city,
      },
      phone: person.phone,
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
      <Formik
        initialValues={{
          id: editPerson.id,
          name: editPerson.name,
          email: editPerson.email,
          gender: editPerson.gender,
          address: {
            street: editPerson.address.street,
            city: editPerson.address.city,
          },
          phone: editPerson.phone,
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Modal
            title="Add Person"
            // centered
            open={editPersonModalOpen}
            onOk={() => handleSubmit()}
            onCancel={() => setEditPersonModalOpen(false)}
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
