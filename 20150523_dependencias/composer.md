# Composer Wiki

Para complementar la [presentación](http://ibandominguez.github.io/charla-composer/), hemos traducido
las secciones de introducción y uso básico de la web oficial de composer.

## Introducción

Composer es una herramienta para la gestión de dependencias en PHP. Nos permite declarar
las librerías que nuestro proyecto necesita e instalarlas de manera automática.

## Gestión de Dependencias

Composer es un gestor de dependencias pero funciona de manera diferente en comparación con Pear.
Composer instala las dependencias a nivel proyecto.

Esta idea no es nueva y Composer se ha inspirado en [NPM](https://npmjs.org/) para node
y [bundler](http://bundler.io/) para ruby.

Composer soluciona los siguientes problemas:

a) Tenemos un proyecto que depende de una serie de librerías.

b) Algunas de esas librerías dependen de otras librerías.

c) Declaramos las librerías.

d) Composer valida las versiones de los paquetes que necesitan ser instalados y los instala en nuestro proyecto.

## Declaración de dependencias

Digamos que estamos creando un proyecto, y necesitamos una librería para los logs.
Decidimos usar [monolog](https://github.com/Seldaek/monolog). Con el objetivo de
agregarla a nuestro proyecto, lo único que tenemos que hacer es crear un archivo `composer.json`
que describe las dependencias que se necesitan.

```json
{
    "require": {
        "monolog/monolog": "1.2 *."
    }
}
```

## Requisitos para usar Composer

Composer requiere PHP 5.3.2+ para funcionar. No obstante si surgiese algún inconveniente recibiríamos
una notificación durante la instalación especificando otras posibles dependencias.

Para la instalación de las librerías necesitaremos un VCS como git o svn.

Composer es multiplataforma y nos esforzamos para que funcione igual de bien en Windows,
Linux y OSX.

## Instalación - Linux/Unix/OSX

Existen dos formas de instalar Composer. A nivel local como parte de su
proyecto, o nivel global como un ejecutable de sistema.

#### Local

```sh
curl -sS https://getcomposer.org/installer | php
```

> ** Nota: ** Si lo anterior falla por alguna razón, se puede descargar el instalador
> usando `php` :

```sh
php -r "readfile('https://getcomposer.org/installer');" | php
```

Podemos instalar Composer en un directorio específico utilizando `--install-dir`
que recibe un parámetro (ruta absoluta o relativa):

```sh
curl -sS https://getcomposer.org/installer | php -- --install-dir=bin
```

#### Global

```sh
curl -sS https://getcomposer.org/installer | php
mv composer.phar/usr/local/bin/composer
```

> ** Nota: ** Si lo anterior falla debido a los permisos, vuelve a probar con sudo.

> ** Nota: ** En OSX Yosemite el directorio `/usr` no existe de forma predeterminada. Si recibe el error "/usr/local/bin/composer: No existe el fichero o directorio", entonces debe crear `/usr/local/bin/` manualmente antes de continuar.

Tras la instalación podremos ejecutar `composer` directamente.

## Instalación - Windows

### Instalador

Esta es la forma más fácil de instalar Composer en su máquina.

Descargue y ejecute [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe),
se instalará la última versión Composer y se configurará el PATH, Para usarlo con solo
necesitar llamar `composer` desde cualquier directorio en su línea de comandos.

> ** Nota: ** Reinicie la terminal para volver actulizar el PATH.

## Usando Composer

Ahora usaremos Composer para instalar dependencias.

Para resolver y descargar dependencias, ejecute el comando `install`:

```sh
php composer.phar install
```

O si composer ha sido instalado globalmente:

```sh
composer install
```

A continuación las dependencias serán descargadas en el directorio vendor.

## Autoloading

Además de instalar las librerías, composer genera un autoloader que está preparado
para cargar todas nuestras dependencias. Lo único que tenemos que hacer es incluirlo 
en nuestro proyecto:

```php
require __DIR__. '/vendor/autoload.php';
```

Walah! Ya podemos usar monolog.

# Uso básico

## `Composer.json`: Configuración de proyecto

Para empezar a utilizar Composer en su proyecto, el único requisito es un fichero `composer.json`. Este archivo describe las dependencias de su proyecto y otros metadatos relacionacionados con la gestión de las
mismas.

Comoser usa json, para más información sobre el [formato JSON](http://json.org/).

### require

La primera (y, a menudo única key) que se usa es require, require nos permite definir lo que necesitamos para cubrir los requisitos de nuestro proyecto.

```json
{
    "require": {
        "monolog/monolog": "1.0 *."
    }
}
```

Como se puede ver, `require` es un objeto que define nombres de paquetes ** ** (por ejemplo,` monolog/monolog`) y la especificación de su versión (por ejemplo `1.0. *`).

### Nombres de paquetes

El nombre del paquete esta formado por el nombre del proveedor y nombre del proyecto proyecto de la siguiente manera proveedor/proyecto.

### versiones

En el ejemplo anterior definimos la versión [`1.0. *`](Http://semver.mwl.be/#?package=monolog%2Fmonolog&version=1.0.*) de monolog. Esto
significa cualquier versión dentro de la rama de desarrollo `1.0`. Por ejemplo `1.0.0`, `1.0.2` o 1.0.20`.

Las versiones pueden especificarse de varias maneras diferentes.

Name           | Example                                                                  | Description
-------------- | ------------------------------------------------------------------------ | -----------
Exact version  | `1.0.2`                                                                  | You can specify the exact version of a package.
Range          | `>=1.0` `>=1.0 <2.0` <code>&gt;=1.0 &lt;1.1 &#124;&#124; &gt;=1.2</code> | By using comparison operators you can specify ranges of valid versions. Valid operators are `>`, `>=`, `<`, `<=`, `!=`. <br />You can define multiple ranges. Ranges separated by a space (<code> </code>) or comma (`,`) will be treated as a **logical AND**. A double pipe (<code>&#124;&#124;</code>) will be treated as a **logical OR**. AND has higher precedence than OR.
Hyphen Range   | `1.0 - 2.0`                                                              | Inclusive set of versions. Partial versions on the right include are completed with a wildcard. For example `1.0 - 2.0` is equivalent to `>=1.0.0 <2.1` as the `2.0` becomes `2.0.*`. On the other hand `1.0.0 - 2.1.0` is equivalent to `>=1.0.0 <=2.1.0`.
Wildcard       | `1.0.*`                                                                  | You can specify a pattern with a `*` wildcard. `1.0.*` is the equivalent of `>=1.0 <1.1`.
Tilde Operator | `~1.2`                                                                   | Very useful for projects that follow semantic versioning. `~1.2` is equivalent to `>=1.2 <2.0`. For more details, read the next section below.
Caret Operator | `^1.2.3`                                                                 | Very useful for projects that follow semantic versioning. `^1.2.3` is equivalent to `>=1.2.3 <2.0`. For more details, read the next section below.

### Próximo Release significativo (Operadores Tilde y Caret)

El operador `~` define un set de versiones, por ejemplo `~1.2` es equivalente a
`>=1.2<2.0.0`, mientras que `~1.2.3` es equivalente a `>=1.2.3<1.3.0`.

El operador `^` se comporta de manera muy similar pero nos da un poco más de flexibilidad. Por ejemplo `^1.2.3`
es equivalente a `>=1.2.3<2.0.0` ya que siguiendo los patrones de versionamiento semántico, no deberían haber actualizaciones que comprometiesen la estabilidad si no cambiase el número principal. 

## Instalación de dependencias

Para traer las dependencias definidas en su proyecto local, basta con ejecutar el
`Comando install` de` composer.phar`.

```sh
php composer.phar install
```

Composer encontrará la última versión estable de `monolog/monolog` que coincida con la restricción de versiones especificadas y la descargará en el directorio `vendor` bajo un directorio con el nombre del proveedor.

> ** Consejo: ** Si usamos git para nuestro proyecto, es probable que ignoremos
> `vendor` con el objetivo de no arrastar todas las dependencias al repo.

Otra cosa que el comando `install` hace es que agregar un `composer.lock` en la raiz del proyecto.

## `composer.lock` - Archivo de bloqueo

Después de instalar las dependencias, Composer escribe la lista de las
versiones exactas que se instalan. Este archivo servirá para bloquear las versiones y garantizar
la estabilidad entre los diferentes entornos.

Si no existe ningún archivo `composer.lock`, Composer leerá las dependencias y
versiones de `composer.json` y creará el archivo de bloqueo después de ejecutar el `update` o el `install`.

Para omitir composer.lock e instalar las últimas versiones usaremos composer update.

```sh
php composer.phar update
```
> ** Nota: ** Composer mostrará una advertencia al ejecutar un comando `install` si
 composer.lock` y `composer.json` no están sincronizados.
 
Si solo deseamos actualizar una dependencia, lo podemos hacer de la siguiente manera:

```sh
php composer.phar update monolog/monolog [...]
```

## Packagist

[Packagist](https://packagist.org/) es el repositorio principal de Composer. Packagist tiende a ser el la opción que todos los desarrolladores usan para distribuir sus librerías.

en el [sitio web packagist](https://packagist.org/) (packagist.org), podemos navegar y buscar librerías.

## Autoloading

Para las librerías que especifican autoloading, Composer genera un
Archivo `vendor/autoload.php`. Que podemos incluir en nuestro proyecto para hacer uso de las dependencias
de manera ágil y efectiva.

```php
require 'vendor/autoload.php';
```

Esto hace que sea muy fácil de utilizar código de terceros. Por ejemplo: Si su
proyecto depende de monolog, usted puede comenzar a usar las clases de la misma.

```php
$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));

$log->addWarning('Foo');
```

También podemos utilizar composer para el autoloading de nuestro propio código.

```json
{
    "autoload": {
        "psr-4": {"Acme\\": "src/"}
    }
}
```

Composer registrará un [PSR-4](http://www.php-fig.org/psr/psr-4/) para el namespace `Acme`. Definiendo como raiz el directorio `src/`.

Composer también nos permite realizar otros tipos de autoloading, bien sea PSR-0, classmap o incluso file.
