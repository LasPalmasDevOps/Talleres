title: Taller de gestión de dependencias
author:
  name: Oliver Gutiérrez (Las Palmas DevOps)
  url: https://github.com/LasPalmasDevOps
output: presentacion.html
theme: sudodoki/reveal-cleaver-theme
controls: true

--

# Gestión de dependencias
## Como gestionar dependencias con Python y no morir en el intento

--

### ¿Gestión de dependencias?
* Administrar módulos
* Poder replicar la configuración fácilmente
* Automatizar desempeño de aplicaciones

--

### Módulos en Python
* Carpeta con código python
* Módulo distutils (estándar)
  * Eggs
* setuptools (mejora)

--

### Paquetes y más paquetes
* easy_install
  * Instalar un paquete
  > $ easy_install.py Package
  * Instalar desde URL descargable
  > $ easy_install.py http://sample.host/Package-X.Y.tar.gz
  * Instalar desde SVN
  > $ easy_install.py http://svn.sample.host/Package/trunk
  * Want Moar?: [RTFM](https://pythonhosted.org/setuptools/easy_install.html)

--

### Paquetes y más paquetes (2)
* pip
  * Buscar módulos
  * Instalar los módulos que necesitamos
  * Eliminar los que no necesitamos
  * Actualizar cuando queramos
  * Guardar la lista de paquetes instalados
  * Instalar dependencias desde fichero
  * Actualizar dependencias desde fichero

--

### ¿Y para múltiples proyectos?
* Entornos virtuales (virtualenv)
  * Entornos independientes
  * Intérprete propio
  * Paquetes disponibles sólo en este entorno

--

### Extras

* Instalación de paquetes desde github
* Gestión de entornos virtuales más fácil (virtualenvwrapper)
