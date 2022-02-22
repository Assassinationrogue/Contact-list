export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface Fields {
  [key: string]: Field;
}

export interface Field {
  readonly: boolean;
  required: boolean;
  max: number;
  min: number;
}
