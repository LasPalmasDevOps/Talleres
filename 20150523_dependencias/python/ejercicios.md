title: Taller de gestión de dependencias
author:
  name: Oliver Gutiérrez (Las Palmas DevOps)
  url: https://github.com/LasPalmasDevOps
output: ejercicios.html
theme: sudodoki/reveal-cleaver-theme
controls: true

--

# Gestión de dependencias
## Ejercicios de gestión de dependencias en Python

--

### Configuración del entorno de pruebas

* Instalar Vagrant y Virtualbox
* Clonar repositorio de talleres
  * git clone https://github.com/LasPalmasDevOps/Talleres.git
* Iniciar máquina virtual
  * cd Talleres/20150523_dependencias/python/ejercicios/
  * vagrant up
* Entrar en la máquina virtual
  * vagrant ssh

--

### Entorno virtual

* Creamos el entorno virtual usando mkvirtualenv
  * mkvirtualenv miproyecto
* El entorno virtual se crea y se activa
--

### Instalar paquetes

* Uno por uno
  * pip install Mysql-python
  * pip install pytz
  * pip install pillow
  * pip install django

* De una sola vez
  * pip install Mysql-python pytz pillow django

--

### Aplicación de prueba
* Crear aplicación de prueba
  * django-admin startproject miproyecto
  * cd miproyecto
  * ./manage.py runserver 0.0.0.0:8000
* Acceder con nuestro navegador preferido a http://localhost:8000
* Cerramos el servidor de desarrollo pulsando Control+C en la consola

--

### Guardar dependencias

* Crear fichero de dependencias
  * pip freeze > requirements.txt

--

### Crear un repositorio para probar todo esto

* Configuramos git para poder usarlo
  * git config --global user.name "Yo mismo"
  * git config --global user.email "yo@mismo.com"

* Creamos un repositorio git en el proyecto
  * git init .
  * git add *
  * git commit -a -m "Commit inicial"

--

### Volvemos al principio

* Desactivamos el entorno virtual
  * deactivate

* Vamos al directorio de inicio del usuario
  * cd ~

--

### Replicando el proyecto

* Creamos una carpeta nueva y clonamos el proyecto
  * mkdir replicado
  * cd replicado
  * git clone file:///home/vagrant/miproyecto/

--

### Creando el nuevo entorno virtual

* Entramos en la carpeta del proyecto
  * cd miproyecto
* Creamos el entorno virtual manualmente
  * virtualenv env
* Lo activamos
  * source env/bin/activate
* Instalamos las dependencias
  * pip install -r requirements.txt

--

### Ejecutando la aplicación

* Ya podemos ejecutar la aplicación nuevamente
  * ./manage.py runserver 0.0.0.0:8000
* Acceder con nuestro navegador preferido a http://localhost:8000
* Cerramos el servidor de desarrollo pulsando Control+C en la consola

--

### Extras

* Eliminamos la versión actual de Django
  * pip uninstall django

* Instalamos la versión de desarrollo de Django desde el repositorio Github
  * pip install -e git+https://github.com/django/django.git#egg=django-master

* Volvemos a ejecutar el servidor de desarrollo
  * ./manage.py runserver 0.0.0.0:8000
* Acceder con nuestro navegador preferido a http://localhost:8000
* Cerramos el servidor de desarrollo pulsando Control+C en la consola

