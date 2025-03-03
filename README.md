## Descripcion

Proyecto del Backend de la Tienda para la tesis construido en NEstJS

## Implementando Kubernet

Para aplicar algun cambio ejecutamos `kubectl apply -f name.yml`
  ✔ Permite actualizar configuraciones sin borrar y recrear recursos.
  ✔ Evita downtime en aplicaciones en producción.
  ✔ Facilita la gestión declarativa de Kubernetes.


El comando `kubectl get all` muestra todos los recursos en el namespace actual de Kubernetes, incluyendo:
  ✅ Pods (los contenedores en ejecución)
  ✅ Deployments (gestión de replicas de pods)
  ✅ Services (exposición de los pods)
  ✅ ReplicaSets (control de cuántos pods deben estar activos)
  ✅ StatefulSets, DaemonSets (otros tipos de control de pods)

