export enum VALID_ENTITY {
  ROLE = 'role',
  USER = 'user',
}

export class ROLES {
  //? Permisos User
  static USER_CREATE = 'USER_CREATE';
  static USER_UPDATE = 'USER_UPDATE';
  static USER_VIEW = 'USER_VIEW';
  static USER_DELETE = 'USER_DELETE';

  //? Permisos Roles
  static ROLE_CREATE = 'ROLE_CREATE';
  static ROLE_UPDATE = 'ROLE_UPDATE';
  static ROLE_VIEW = 'ROLE_VIEW';
  static ROLE_DELETE = 'ROLE_DELETE';
}
