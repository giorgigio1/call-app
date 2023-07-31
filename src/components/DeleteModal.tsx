import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { Person } from "../type";

interface DeleteModalProps {
  person: Person;
  setDataSource: React.Dispatch<React.SetStateAction<Person[]>>;
}

const { confirm } = Modal;

export const deleteModal = ({ person, setDataSource }: DeleteModalProps) =>
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      setDataSource((data) => data.filter((item) => item !== person));
    },
  });
