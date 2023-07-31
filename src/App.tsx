import "./App.css";
import { Button, Table } from "antd";
import { Person } from "./type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AddPersonModal } from "./components/AddPersonModal";
import { deleteModal } from "./components/DeleteModal";
import { EditPersonModal } from "./components/EditPersonModal";
import { dblClick } from "@testing-library/user-event/dist/click";

interface Column {
  title: string;
  dataIndex?: string;
  render?: (data: any) => React.ReactNode;
}

interface Address {
  street: string;
  city: string;
}

export const App = () => {
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [editPersonModalOpen, setEditPersonModalOpen] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);

  const [dataSource, setDataSource] = useState<Person[]>([
    {
      id: 10,
      name: "Vilma Jefferson",
      email: "vilmajefferson@gology.com",
      gender: "female",
      address: {
        street: "Bath Avenue",
        city: "New York",
      },
      phone: "+1 (814) 496-3905",
    },
    {
      id: 11,
      name: "Cassandra Nguyen",
      email: "cassandranguyen@gology.com",
      gender: "female",
      address: {
        street: "Hamilton Avenue",
        city: "Chicago",
      },
      phone: "+1 (946) 426-2243",
    },
    {
      id: 12,
      name: "Lenora Clements",
      email: "lenoraclements@gology.com",
      gender: "female",
      address: {
        street: "Seba Avenue",
        city: "San Diego",
      },
      phone: "+1 (838) 598-2355",
    },
  ]);

  const columns: Column[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Street",
      dataIndex: "address",
      render: (address: Address) => address.street,
    },
    {
      title: "City",
      dataIndex: "address",
      render: (address: Address) => address.city,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Edit / Delete",
      render: (person: Person) => (
        <>
          <EditOutlined
            onClick={() => {
              setEditPersonModalOpen(true);
              updatePerson(person);
            }}
            style={{ cursor: "pointer" }}
          />
          <DeleteOutlined
            onClick={() => deleteModal({ person, setDataSource })}
            style={{ marginLeft: 30, color: "red", cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  const updatePerson = (person: Person) => {
    setEditPerson(person);
  };

  const doubleClickEdit = (person: Person) => {
    return {
      onDoubleClick: () => {
        setEditPersonModalOpen(true);
        updatePerson(person);
      },
    };
  };

  return (
    <div className="App">
      <Button
        type="primary"
        onClick={() => setAddPersonModalOpen(true)}
        style={{ marginBottom: 50 }}
      >
        Add Person
      </Button>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        onRow={doubleClickEdit}
      />
      {addPersonModalOpen && (
        <AddPersonModal
          addPersonModalOpen={addPersonModalOpen}
          setAddPersonModalpen={setAddPersonModalOpen}
          dataSource={dataSource}
          setDataSource={setDataSource}
        />
      )}
      {editPersonModalOpen && (
        <EditPersonModal
          editPersonModalOpen={editPersonModalOpen}
          setEditPersonModalOpen={setEditPersonModalOpen}
          dataSource={dataSource}
          setDataSource={setDataSource}
          editPerson={editPerson}
        />
      )}
      <Button type="primary">GO TO CHART</Button>
    </div>
  );
};
