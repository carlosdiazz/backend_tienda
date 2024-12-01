export enum VALID_ENTITY {
  ROLE = 'role',
  USER = 'user',
  EMPRESA = 'empresa',
  PRODUCTO = 'producto',
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

  //?Permiso de Empresa
  static EMPRESA_CREATE = 'EMPRESA_CREATE';
  static EMPRESA_UPDATE = 'EMPRESA_UPDATE';
  static EMPRESA_VIEW = 'EMPRESA_VIEW';
  static EMPRESA_DELETE = 'EMPRESA_DELETE';

  //?Permiso de Empresa
  static PRODUCTOS_CREATE = 'PRODUCTOS_CREATE';
  static PRODUCTOS_UPDATE = 'PRODUCTOS_UPDATE';
  static PRODUCTOS_VIEW = 'PRODUCTOS_VIEW';
  static PRODUCTOS_DELETE = 'PRODUCTOS_DELETE';
}
