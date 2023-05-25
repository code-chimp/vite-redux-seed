import IGeoPoint from './IGeoPoint';

export default interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoPoint;
}
