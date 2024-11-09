interface RegisterInterface {
    firstname: string;
    lastname: string;
    phonenumber: number
    email: string;
    dateofbirth: string
    password: string
    confirmpassword?: string
    interests: string[]
    time:number;
    otp:number|string
    _id?:any
  }

interface IRegisterSuccess{
  success:boolean;
  message:string;
  time?:number|string,
  user?:any
}