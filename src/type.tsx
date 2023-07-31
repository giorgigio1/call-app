export interface Person {
  id: string | number;
  name: string;
  email: string;
  gender: string | "male" | "female";
  address: {
    street: string;
    city: string;
  };
  phone: string;
}
