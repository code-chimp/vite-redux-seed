import FetchMethods from '../@enums/FetchMethods';

type FetchRequestType =
  | FetchMethods.Delete
  | FetchMethods.Get
  | FetchMethods.Patch
  | FetchMethods.Post
  | FetchMethods.Put;

export default FetchRequestType;
