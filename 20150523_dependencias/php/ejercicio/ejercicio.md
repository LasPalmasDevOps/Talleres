# Ejercicio Composer

El objetivo principal de este ejercicio es ver la respuesta de composer cuando
cambios de entornos de trabajo.

## Creamos un proyecto

Creamos un directorio

```sh
$ mkdir composer && cd composer/
```

creamos un archivo `composer.json`

```json
{
  "require": {
    "symfony/validator": "dev-master"
  }
}
```

Instalamos las dependencias

```sh
$ composer install
```

## Portando librerías entre entornos

>si usamos vagrant

Para este ejercicio hemos creado un Vagrantfile que está disponible en el repo de talleres [https://github.com/LasPalmasDevOps/Talleres/blob/master/20150523_dependencias/php/ejercicio/Vagrantfile](https://github.com/LasPalmasDevOps/Talleres/blob/master/20150523_dependencias/php/ejercicio/Vagrantfile)

arrancamos vagrant

```sh
$ vagrant up && vagrant ssh
```

Podemos crear un composer.json usando nano e instalar las dependencias

```sh
$ nano composer.json
```

```json
{
  "require": {
    "symfony/validator": "dev-master"
  }
}
```

```sh
$ composer install
```

o alternativamente usamos la orden composer require

```sh
$ composer require symfony/validator:dev-master
```

Esperamos respuesta

>si no usamos vagrant

salimos del directorio actual y creamos otro

```sh
$ cd .. && mkdir composer2 && cd composer2
```

creamos un `composer.json` pero en este caso vamos a limitar nuestro
entorno a el rango de versiones de php 5.2.*

```json
{
  "require": {
    "php": "5.2.*",
    "symfony/validator": "dev-master"
  }
}
```

Instalamos las dependencias

```sh
$ composer install
```

Deberíamos recibir un error

```sh
Problem 1
    - This package requires php 5.2.* but your PHP version (5.6.7) does not satisfy that requirement.
```
