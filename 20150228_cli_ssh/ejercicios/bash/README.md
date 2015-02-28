# Taller de Bash

### Introducción

Esta no es una guía exhaustiva de Bash, simplemente una introducción a los conceptos básicos de una shell de línea de ordenes con algunas cosas específicas de Bash.

Para profundizar en el uso de Bash hay muy buena documentación en la página del manual de Bash (`man bash`) y en las guías que hay en el proyecto [TLDP](http://www.tldp.org/guides.html) (*The Linux Documentation Project*), [Bash Guide for Beginners](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/index.html) y  [Advanced Bash-Scripting Guide](http://www.tldp.org/LDP/abs/html/).

**Muy recomendable mirarse ambas fuentes de ayuda sobre Bash.**

### Ayuda

Existen dos fuentes fundamentales de ayuda (aparte de *Google*) cuando trabajamos en la línea de ordenes:
* El `man`.
* La ayuda de la orden o programa que vayamos a usar.

Generalmente conociendo las ordenes básicas, el funcionamiento básico de Bash y consultando estas ayudas, tendremos de sobra para manejar cualquier situación.

Para consultar el manual de una orden solo hace falta lanzar la orden `man` y el nombre de la orden de la que queremos ayuda como parámetro:
```
$ man chmod
```
Eso nos mostrará la ayuda de la orden `chmod`.

> **TIP:** Si no tenemos claro qué orden buscamos, podemos preguntarle al manual (con la orden `apropos`) por algo que nos recuerde a lo que buscamos. En el ejemplo de antes  buscamos una orden para cambiar los permisos:

```
$ apropos permissions
access (2)           - check real user's permissions for a file
...
chmod (2)            - change permissions of a file
...
ioperm (2)           - set port input/output permissions
```

### Tipos de archivos

> **NOTA:** En Unix/linux, *todo es un archivo*

* Archivos
* Directorios
* Enlaces simbólicos
* Archivos especiales

### Árbol de directorios

```
/
├── bin
├── boot
├── cdrom
├── dev
├── etc
├── home
│   └── usuario
├── lib
├── media
├── mnt
├── opt
├── proc
├── sbin
├── srv
├── sys
├── tmp
├── usr
│   ├── bin
│   ├── include
│   ├── lib
│   ├── local
│   ├── sbin
│   └── share
└── var
    ├── backups
    ├── cache
    ├── crash
    ├── lib
    ├── lock -> /run/lock
    ├── log
    ├── mail
    ├── run -> /run
    ├── spool
    ├── state
    ├── tmp
    └── www
```

## Permisos

```
# permisos    propietario   grupo     archivo
 -rw-r--r--   root          root     /etc/passwd
 drwxr-xr-x   root          root     /etc/init.d
```

### ¿Qué se puede hacer?

Existen 3 tipos de permisos básicos en los archivos:

* Lectura (**r**)
* Escritura (**w**)
* Ejecución (**x**)

Para cada entidad se define una combinación de estos permisos. Por ejemplo, un archivo que solo se pueda leer, pero no escribir ni ejecutar:

```
r--
```
Si se pudiera también escribir:
```
rw-
```

Y si se pudiera también ejecutar:
```
rwx
```

### ¿Quién puede hacer X?
Cada archivo (o directorio) tiene definidos sus permisos para 3 entidades dentro del sistema:

* El propietario del archivo (`owner`)
* El grupo de usuarios al que pertenece el archivo (`group`)
* El resto de usuarios del sistema (`others`)

Esto se representa agrupando los permisos vistos arriba en 3 grupos:

| entidad  | permisos    |
|----------|-------------|
| *owner*  | `rwx------` |
| *group*  | `---rwx---` |
| *others* | `------rwx` |

Ejemplos:

| Permisos     | owner  | group  | archivo       |
|--------------|--------|--------|---------------|
| `-rw-r--r--` | `root` | `root` | `/etc/passwd` |
| `drwxr-xr-x` | `root` | `root` | `/etc/init.d` |

> **NOTA:** La `d` o `-` inicial en los permisos indica si es o no un directorio. Si lleva una `d` es un directorio.

### Permisos en modo numérico (octal)

Representa los mismos permisos de forma numérica.
En esta forma, cada tipo de permiso tiene un valor (`r` => `4`) y para obtener el valor numérico de los permisos se suman dichos valores.
Equivalencias:

| Letras | Octal | Valor numérico |
|--------|-------|----------------|
| `--x`  | `001` | `1`            |
| `-w-`  | `020` | `2`            |
| `r--`  | `400` | `4`            |
| `r-x`  | `401` | `5`            |
| `rw-`  | `420` | `6`            |
| `rwx`  | `421` | `7`            |

> **NOTA:**  No hay que olvidar que hay que seguir agrupando los valores de 3 en 3, para seguir teniendo permisos para el `owner`, el `group` y `others`.

Ejemplo:

| Permisos    | Octal         | Valor numérico |
|-------------|---------------|----------------|
| `rw-r--r--` | `420 400 400` | `644`          |
| `rwxr-xr-x` | `421 401 401` | `755`          |


### Cambiar los permisos de un archivo

Ahora que sabemos cómo se describen los permisos de un archivo, ya podremos cambiarlos cuando nos haga falta.
Para ello usaremos la orden `chmod` (*change mode*).
`chmod` admite tanto los permisos en su forma de letras o en el valor numérico del octal.

Para las letras hay que tener en cuenta 2 cosas:

* Se pueden definir permisos concretos (`=`), quitarlos (`-`) o añadirlos (`+`):
```
$ chmod +x my_script.sh
```

Este ejemplo **añade** permisos de ejecución a los permisos que ya tenía el archivo.
Esta forma es útil cuando no necesitas saber los permisos totales del archivo, solo añadir o quitar uno.

* Se puede especificar la entidad sobre la que se especifica el permisos con una letra:

| Letra | Entidad                                   |
|-------|-------------------------------------------|
| `u`   | `owner` (usuario propietario del archivo) |
| `g`   | `group`                                   |
| `o`   | `others`                                  |


Ejemplo:

```
$ chmod 644 my_file.txt
```

Eso es equivalente a:
```
$ chmod u=rw,g=r,o=r my_file.txt
```

### Cambiar el propietario de un archivo

Algo que también puede hacernos falta alguna vez, es cambiar el propietario de un archivo.
Hay que tener presente que solo podemos cambiar el propietario de un archivo sobre el que ya tengamos permisos y que solo podremos cambiarlo a un usuario o grupo al que pertenezcamos.
Por esta razón, lo más normal es que solo hagamos esto como usuario administrador (`root`). Aunque no siempre.

La forma de cambiar el propietario de un archivo es con la orden `chown` (*change owner*).
Con dicha orden no solo se puede cambiar el propietario, sino también el grupo al que pertenece el archivo.

La forma básica de uso es la siguiente:
```
$ chown new_owner file.txt
```

Siendo `new_owner` el usuario que queremos que sea el nuevo propietario del archivo.
Si queremos cambiarle también el grupo (por ejemplo, al grupo `webadmin`), lo haríamos añadiendo dos puntos (`:`) y el grupo:
```
$ chown new_owner:webadmin file.txt
```

> **NOTA:** Existe una orden (`chgrp`) para cambiar únicamente el grupo.

### Ejercicios

1. Crear un archivo y ver con qué permisos se crea.
1. ¿Cómo serían esos permisos en octal?
1. Darle permisos de ejecución.
1. Hacer que solo el propietario del archivo pueda leer el archivo.
1. Crear un directorio y ver con qué permisos se crea.
1. ¿Cómo serían esos permisos en octal?
1. Ponerle permisos 444. ¿Qué permisos serían esos? ¿Tu usuario podría entrar en el directorio?
1. Modificar los permisos para que solo el propietario pueda entrar en el directorio.
1. Hacer que el usuario `root` sea el propietario del directorio. ¿Podemos entrar en el directorio?

> TIP: Órdenes que podrían ser útiles en estos ejercicios: `touch`, `ls`, `chown`, `cd` y `sudo`.

## Acciones básicas

* Mostrar algo por pantalla (`echo`)
```
$ echo "Hola mundo"
Hola mundo
```

* Listar archivos y directorios (`ls`)
```
$ ls
archivo1 archivo2 directorio/
```

* Crear directorio (`mkdir`)
```
$ ls

$ mkdir new_directory
$ ls
new_directory
```

* Borrar directorio (`rmdir`)
```
$ ls
old_directory
$ rmdir old_directory
$ ls

```

* Moverse de un directorio a otro (`cd`)
```
$ pwd
/home/pepe
$ cd /tmp/
$ pwd
/tmp
```

* Borrar archivo (`rm`)
```
$ ls
file.txt other_file.txt
$ rm file.txt
$ ls
other_file.txt
```

* Ver el contenido de un archivo (`cat`, `less` o `more`)
```
$ cat file.txt
Contenido del archivo.
```

* Mover o renombrar un archivo o directorio (`mv`)
```
$ ls
file.txt
$ mv file.txt archivo.txt
$ ls
archivo.txt
```

### Ejercicios

1. Crear un directorio llamado `tests`.
1. Entrar en el directorio.
1. Crear un archivo llamado `file.txt` que ponga "Hola mundo".
1. Mostrar el contenido del archivo por pantalla.
1. Renombrar el archivo `file.txt` como `archivo1.txt`.
1. Crear una copia el archivo `archivo1.txt` que se llame `archivo2.txt`.
1. Crear una copia del directorio `tests` que se llame `pruebas`.
1. Borrar el directorio `tests`.

> TIP: Mirar el manual y la ayuda de las órdenes que se muestran arriba.


## Variables

### Definición y uso de variables
```
VARIABLE="valor"
NUM=35
a=0
```

> **NOTA:** Nótese que no hay espacios entre el nombre la la variable, el signo `=` y el valor que se asigna a la variable.
El nombre de la variable puede  ser tanto mayúsculas como minúsculas.

Para usar la variables solo necesitamos poner su nombre precedido del símbolo del dolar (`$`):
```
$ echo $VARIABLE
valor
```

### Variables de entorno

Las variables se definen en el ámbito local, es decir, que una vez se acaba el *script* o *shell* en dónde se definió, la variable desaparece.
Pero hay variables que *viven* durante toda la sesión, son las llamadas variables de entorno y que se suelen definir al hacer *login* en el sistema o arrancarse la *shell*.

Pero también pueden modificarse o crearse durante la sesión. La forma de crear o modificar una existente es usando la función `export`:

```
$ export HOME=/tmp/new_home/
```

> **NOTA**: Nótese que a la hora de *exportar* una variable no se le antepone el símbolo `$`.

Para ver las variables de entorno disponibles se puede lanzar la orden `env`:
```
$ env
TERM=xterm
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games
USER=pepe
HOME=/home/pepe
PWD=/home/pepe
LOGNAME=pepe
...
```

Podemos usar cualquiera de las variables de entorno en cualquier momento. Sea desde la *shell*, desde un *script* o desde el código en nuestra aplicación.

Bash:
```
$ echo $HOME
/home/pepe
```

Python:

```python
import os

print os.environ["HOME"]
```

Ruby:
```ruby
puts ENV['HOME']
```

Php:
```php
echo getenv('HOME');
```

### Variables especiales

Hay algunas variables especiales que guardan valores temporales y que pueden ser de mucha utilidad. Sobre todo en *scripts*.

| Variable | Definición                                                              |
|----------|-------------------------------------------------------------------------|
| `$*`     | Lista de parámetros.                                                    |
| `$@`     | Lista de parámetros.                                                    |
| `$#`     | Número de parámetros.                                                   |
| `$?`     | Código de salida de la orden anterior.                                  |
| `$-`     | Opciones o *flags* de la *shell*.                                       |
| `$$`     | `PID` (identificador del proceso) del proceso actual.                   |
| `$!`     | `PID` del proceso más reciente que se esté ejecutando en segundo plano. |
| `$0`     | Nombre de la *shell* o del *shellscript* que se está ejecutando.        |
| `$_`     | Último parámetro de la orden anterior.                                  |


### Ejercicios

1. Mostrar por pantalla cuál es el directorio actual, usando únicamente la orden `echo` (*Pista*: se pueden usar las variables que haga falta).
1. Añadir al `PATH` el directorio `bin` dentro del `home` del usuario.
1. Crea una variable llamada `VAR` que contenga el valor `Esto es una prueba`.
1. Cambia el valor de la variable `VAR` para que contenga `20`.
1. Comprobar si la variable está entre las variables de entorno.
1. Si no lo está, hacer que lo esté.
1. Mostrar por pantalla una línea similar a la siguiente, pero con los datos de tu sistema. No puedes escribir diréctamente lo que está entre comillas:
```
Hola, soy "Pepe", vivo en "/home/pepe", aunque ahora estoy en "/home/pepe/pruebas" y mi shell es "/bin/bash".
```

> TIP: El `PATH` es una variable de entorno que indica en qué directorios se van a buscar los programas que se pueden lanzar desde la *shell*.


## Configuración de la shell

Como en cualquier programa Bash se puede configurar. La configuración es bastante flexible y dinámica, porque se basa, en gran medida, en  las variables de entorno que antes explicamos. Estas variables se guardan en archivos de configuración.

En estos archivos de configuración se pueden definir variables de entorno que siempre usamos o crear alias para operaciones que hacemos con frecuencia.
También es útil para redefinir valores de variables de entorno como el `PATH` o `PS1`.

> **NOTA:** "*Cargar*" un archivo de configuración es algo parecido a *importar* o *cargar* una librería en un lenguaje de programación.
Lo que realmente se hace es leer el archivo y ejecutar su contenido. La forma de hacerlo es mediante la orden `source` o su equivalente `.`:
```
$ source file_rc.sh
```
o
```
$ . file_rc.sh
```

### Shell con login
En caso de entrar en la *shell* con el usuario y contraseña (vía `ssh`, en la [terminal virtual](https://en.wikipedia.org/wiki/Virtual_console) o usando `bash --login`) se cargará la información de los siguientes archivos (en este mismo orden):

* `/etc/profile`
* `~/.bash_profile`, `~/.bash_login` o `~/.profile` (el primero que se encuentre)

### Shell sin login

En caso de arrancarse simplemente la *shell*, sin hacer *login*, se cargará el archivo `~/.bashrc`.
En este caso no se cargarán los archivos mencionados antes.

> **NOTA:** Es bastante común poner todas las definiciones del usuario en el archivo `~/.bashrc` y desde el archivo `~/.bash_profile` cargarlo.
De esta forma, tanto si arrancamos la *shell* de una u otra forma, se cargarán dichos valores. Sin tener que duplicar dichas definiciones.


### Ejercicios

1. Hacer que cuando se abra otra *shell* esté disponible la variable `MY_VAR` con valor `100`.
1. Abrir otra *shell* y comprobar que está disponible dicha variable.
1. Hacer que la variable `MY_VAR` tenga valor `LOGIN` cuando se entre en una nueva sesión con *login* y `NOLOGIN` cuando se abra otra *shell* sin hacer *login*.
1. Hacer que en las nuevas sesiones, cuando se lance la orden `list`, se lance realmente la orden `ls`.

> TIP: Buscar información sobre la orden `alias` y leer el archivo `~/.bashrc`.


## Entrada y salida

* Descriptores especiales (`stdin`, `stdout` y `stderr`)
* Redirecciones
```
$ echo "Hola" > file.txt
```
```
$ grep Hola < file.txt
Hola
```
```
$ ls /directorio_inexistente/ 2> error.log
```
* Tuberías (*pipes*)

```
$ echo "Hola" | sed 's/o/a/g'
Hala
```


### Ejercicios

1. Listar el contenido del directorio `/usr/lib` de forma paginada.
1. Crear un archivo con el listado de las variables de entorno.
1. Mostrar por pantalla el contenido de ese archivo, pero solo aquellas variables que contengan tu nombre de usuario.
1. ¿Cuántas variables hay definidas en el archivo que empiecen por la letra `S`?
1. Crea un archivo con el contenido del directorio `pruebas` que creaste antes.
1. Cambia, en el archivo, las extensiones de los archivos que se muestran dentro (`archivo1.txt` y `archivo2.txt`) para que sean `.sh` en vez de `.txt`.
1. Ejecuta la orden `grep user /etc/*` y guarda en un archivo llamado `user.txt` las coincidencias y en otro llamado `fails.txt` los errores.
1. Muestra por pantalla y en orden alfabético los nombres de los archivos que hay en `fails.txt. Únicamente los nombres de los archivos.

> TIP: Mirar las utilidades `grep`, `sed`, `sort` y `wc`.


## Estructuras de control


### Condiciones

Tanto en los bucles como en las estructuras condicionales se usan condiciones para tomar una decisión (seguir en el bucle, salir del bucle o tomar un camino u otro de la bifurcación).

La condición puede ser una comparación entre dos elementos o la ejecución de una orden, lo importante es que el resultado de un valor entero. Si ese valor es 0, se considerará que se cumple la condición, si es distinto de 0, no se cumple.

En realidad, siempre se ejecuta una orden y lo que realmente se evalua es el código de salida (el código que devuelve un programa al terminar) de dicha orden.
En el caso de una comparación, realmente se ejecuta la orden `test`, pasándole como parámetros, los elementos a comaprar y el tipo de comparación.

> **TIP:** Consoltar la página del manual de la orden `test` (`man test`).

Pero Bash tiene una forma sencilla de hacer la comparación de forma que no tengas que lanzar `test` y que sea más natural. Usando `[` y `]` que, en realidad, son un alias a `test`.

Es decir, esto:
```
$ test  foo = bar
$ echo $?
1
```

es igual a esto:
```
$ [ foo = bar ]
$ echo $?
1
```

Ambas devuelven como código de salida 1, es decir, **distinto de 0**. Luego la comparación ha fallado.

En algunos de los ejemplos siguientes usaremos las órdenes `true` y `false` que devuelven respectivamente `0` y `1`.


### Bucles

* `for`
```
for VAR in "foo" "bar" 20
do
  echo $VAR
done
```
```
$ ./script.sh
foo
bar
20
```

Versión en línea (*inline*):
```
$ for VAR in "foo" "bar" 20; do echo $VAR ; done
foo
bar
20
```

* `while`
```
while true
do
  echo "True"
done
```

* `until`
```
until false
do
  echo "True"
done
```

### Condicionales

* `if`
```
if [ "$var" = 10 ]; then
  echo "var es igual a 10"
fi
```
* `if else`
```
if [ "$var" = 10 ]; then
  echo "var es igual a 10"
else
  echo "var NO es igual a 10"
fi
```
* `if elif`
```
if [ "$var" = 10 ]; then
  echo "var es igual a 10"
elif [ "$var" = 20]; then
  echo "var es igual a 20"
fi
```
* `case`
```
VAR=3t

case "$VAR" in
  10)
    echo "VAR es igual a 10"
    ;;
  20)
    echo "VAR es igual a 20"
    ;;
  3?)
    echo "VAR es igual a 3 + otro carácter"
    ;;
   *)
    echo "ninguno de los anteriores"
    ;;
esac
```
* `&&` y `||`
```
$ true && echo "La condición es cierta"
La condición es cierta
$ false && echo "La condición es cierta"
$ true || echo "La condición es falsa"
$ false || echo "La condición es falsa"
La condición es falsa
$ a=20
$ [ "$a" = 20 ] && echo "a es igual a 20"
a es igual a 20
```

### Ejercicios

1. Copia en el directorio `pruebas` todos los archivos de `/bin/`, pero añadiéndoles la extensión `.sh`.
1. Define una variable `a` con valor `50` y una `b` con valor `30`. Luego haz que se evalúe si `a` es mayor que `b` y que se muestre el valor de la suma en caso de ser cierto.

> **TIP:** Mirar la ayuda del comando `expr`.


## Shellscripts

Los *shellscripts* son secuancias de ordenes puestas en un archivo ejecutable. Funcionan como pequeños programas que usan las funciones internas y las órdenes disponibles en la *shell* que se indiquen.
En caso de no indicarse ninguna, se usará la *shell* en la que se ha arrancado el *script*.

Bash permite hacer *scripts* muy sencillos, pero también bastante complejos, pudiéndose agrupar secuencias de ordenes en funciones y llamarlas desde el mismo *script* o desde otro.

### Sha-bang

El `sha-bang` es la marca que indica qué tipo de script es el archivo.
Los primeros dos caracteres (`#!`) son reconocidos por el sistema a la hora de ejecutar un archivo y le dicen que es un script y que deben mirarse los siguientes caracteres para saber qué tipo de script es. Dichos siguientes caracteres deben ser el `PATH` del ejecutable de la *shell* en concreto.

El más estándar para *shellscripts* es:
```
#!/bin/sh
```

Pero se puede especificar una *shell* en concreto:
```
#!/bin/bash
```

Aunque también se puede poner el ejecutable de algún lenguaje dinámico como Python, Ruby o Php:
```
#!/usr/bin/python
```

Incluso un ejecutable que no sea una *shell*:
```
#!/bin/rm

# Este script lo único que hace es borrarse a sí mismo.
```

### Comentarios

Los comentarios en Bash comienzan con el símbolo `#`:

```
#!/bin/bash

# Esto es un comentario.

#
# Otro comentario más largo.
#

################################
#                              #
# Típica cajita de comentarios #
#                              #
################################

```

### Ejercicios

1. Prueba a hacer un script (tienes que darle permisos de ejecución) en el que el `sha-bang` sea `#!/bin/echo` y comprueba a ver qué hace.



## Expansión de variables con ${}

### Valor por defecto

Si no está definida una variable, se usa un valor predeterminada. Si está definida, se usa su valor.
```
$ echo ${NAME:-Pepe}
Pepe
$ NAME="Juanje"
$ echo ${NAME:-Pepe}
Juanje
```

### Asignar valor por defecto
Asigna un valor a la variable, pero solo si ésta no tiene ya algún valor.
```
$ NAME=""
$ echo $NAME

$ echo ${NAME:=Pepe}
Pepe
$ echo $NAME
Pepe
$ echo ${NAME:=Juanje}
Pepe
```


### Mostrar error si no existe la variable

Con el patrón `?` podemos indicar que muestre un error si no existe la variable.
```
$ echo ${X?}
-bash: X: parameter null or not set
```

Podemos poner un mensaje personalizado al error.
```
$ echo ${X?La variable X no existe}
-bash: X: La variable X no existe
$ X=""
$ echo ${X?La variable X no existe}

$ X="Algo"
$ echo ${X?La variable X no existe}
Algo
```


### Usar un valor alternativo, si ya existe la variable y tiene algún valor.
```
$ echo ${Y:+Contenido alternativo}

$ Y=""
$ echo ${Y:+Contenido alternativo}

$ Y="Algún contenido"
$ echo ${Y:+Contenido alternativo}
Contenido alternativo
```


### Subcadenas del valor de la variable
Si no se pone el tamaño, se coje la cadena desde el {inicio}, hasta el final.
Se empieza a contar por 0.
```
$ TEXT="Un texto de ejemplo"
$ echo ${TEXT:3}
texto de ejemplo
$ echo ${TEXT:3:5}
texto
$ GIT_COMMIT=388c4acea3bccfa1f5816b9e46c080345b725f3d
$ echo ${GIT_COMMIT:0:6}
388c4a
$ echo ${GIT_COMMIT:0:10}
388c4acea3
```


### Subcadena quitando del principio
Con un solo # se quitará la primera ocurrencia de lo que esté detrás
```
$ B="blablabla..."
$ echo ${B#bla}
blabla...
$ echo ${B#*bla}
blabla...
```

Con 2 `#` se eliminarón cadenas más largas
```
$ echo ${B##bla}
blabla...
$ echo ${B##*bla}
...
```
Otro ejemplo práctico:
```
D="/srv/chroot/var/chroot/etc/apache"
$ echo ${D#*chroot}
/var/chroot/etc/apache
$ echo ${D##*chroot}
/etc/apache
```


## Subcadena quitando del final

Con un solo `#` se quitará última ocurrencia de lo que esté detrás
```
$ B="blablabla...blablabla"
$ echo ${B%bla}
blablabla...blabla
$ echo ${B%bla*}
blablabla...blabla
```
Con 2 `%` se eliminarán cadenas más largas
```
$ echo ${B%%bla}
blablabla...blabla
$ echo ${B%%bla*}
# ->
```
Otro ejemplo práctico:
```
$ D="/srv/chroot/var/chroot/etc/apache"
$ echo ${D%chroot*}
/srv/chroot/var/
$ echo ${D%%chroot*}
/srv/
```


### Nombres de variables que empiecen por un prefijo
```
$ echo ${!U*}
UID USER
$ echo ${!B*}
BASH BASH_VERSINFO BASH_VERSION
$ echo ${!BASH*}
BASH BASH_VERSINFO BASH_VERSION
```

#### Tamaño del contenido de una variable, en caracteres
```
$ X="Un texto cualquiera"
$ echo ${#X}
19
$ N=22435
$ echo ${#N}
5
```

### Sustituir una cadena
```
$ a=/etc/kung/foo
$ echo ${a/foo/fu}
/etc/kung/fu
```

# WIP
