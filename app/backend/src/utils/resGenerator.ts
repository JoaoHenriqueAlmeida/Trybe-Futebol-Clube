import IResponse from '../interfaces/IResponse';

const responseGenerator = (status:number, message:string, data = {}):IResponse => (
  {
    status,
    message,
    data,
  }
);

export default responseGenerator;
