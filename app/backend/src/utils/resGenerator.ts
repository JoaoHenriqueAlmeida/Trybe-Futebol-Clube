import IResponse from '../interfaces/IResponse';

const responseGenerator = (status = 200, data = {}):IResponse => (
  {
    status,
    data,
  }
);

export default responseGenerator;
