export type User = {
    _id:string;
    username: string;
    email: string;
    password: string;
    __v: number;
  };

  export type Note = {
    _id: string;
    title: string;
    body: string;
    username: string;
    __v: number;
  };