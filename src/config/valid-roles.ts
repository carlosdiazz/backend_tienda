export enum VALID_ENTITY {
  ROLE = 'role',
  USER = 'user',
  EMPLEADOS = 'empleados',
  PRODUCTO = 'producto',
  PROVEEDOR = 'proveedor',
  CLIENTE = 'cliente',
  FACTURA = 'factura',
  FACTURA_DETALLE = 'fact_detalle',
  COMPROBANTE = 'comprobante',
  INVENTARIO = 'inventario',
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

  //?Permiso de Proveedor
  static PROVEEDOR_CREATE = 'PROVEEDOR_CREATE';
  static PROVEEDOR_UPDATE = 'PROVEEDOR_UPDATE';
  static PROVEEDOR_VIEW = 'PROVEEDOR_VIEW';
  static PROVEEDOR_DELETE = 'PROVEEDOR_DELETE';

  //?Permiso de Cliente
  static CLIENTE_CREATE = 'CLIENTE_CREATE';
  static CLIENTE_UPDATE = 'CLIENTE_UPDATE';
  static CLIENTE_VIEW = 'CLIENTE_VIEW';
  static CLIENTE_DELETE = 'CLIENTE_DELETE';

  //?Permiso de Factura
  static FACTURA_CREATE = 'FACTURA_CREATE';
  static FACTURA_UPDATE = 'FACTURA_UPDATE';
  static FACTURA_VIEW = 'FACTURA_VIEW';
  static FACTURA_DELETE = 'FACTURA_DELETE';

  //?Permiso de Comprobante
  static COMPROBANTE_CREATE = 'COMPROBANTE_CREATE';
  static COMPROBANTE_UPDATE = 'COMPROBANTE_UPDATE';
  static COMPROBANTE_VIEW = 'COMPROBANTE_VIEW';
  static COMPROBANTE_DELETE = 'COMPROBANTE_DELETE';
}
