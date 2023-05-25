
export interface userAuth {
  name: string;
  userId: string;
  role: string;
  avatar:string;
}


export interface post{
  _id:string;
  user:userAuth;
  title:string;
  content:string;
  createdAt:string;
  image:string;
  summary:string;
}


