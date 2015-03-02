# SSH

Permite comunicarse a clientes con servidores de forma segura en entornos inseguros. El uso más habitual es para conectarse a una *shell* de una máquina remota, pero sirve para muchas otras cosas.

Para garantizar la seguridad, usa pares de clave pública y privada. Si no tienes ninguno, usa uno creado al momento y luego esperará que te autentifiques como un usuario local de la máquina, pero si tenemos un par de claves, no hará falta autentificarnos, ya que lo hace la clave.

## Creando un par de clave pública y privada

http://es.wikipedia.org/wiki/Criptograf%C3%ADa_asim%C3%A9trica

La criptografía es la práctica (y el estudio) de las formas de alterar mensajes de forma que estos sean no leíbles por aquellos que no tengan autorización.

En sistemas criptográficos generalmente tienen un algoritmo de cifrado, una clave de cifrado y un algoritmo de descifrado. El algoritmo de cifrado (o algoritmo de encriptación), junto con la clave convierten el texto plano (texto legible / plaintext) en texto cifrado (texto no legible / cyphertext). El algoritmo de descifrado, junto con la clave permiten pasar del texto cifrado al texto plano original.

La criptografía de clave pública, o asimétrica (public key cryptography, asymmetric key cryptography) es un tipo de criptografía relativamente reciente, en el que la clave de cifrado y la de descifrado son distintas y de una no se puede sacar la otra de forma sencilla.

Soluciona muchísimos problemas, pero principalmente arregla el problema de distribución de clave (¿cómo compartir una clave por un canal inseguro?). Si una clave cifra y otra descifra, si hacemos pública la que cifra (y la llamamos *clave pública*), cualquiera puede cifrar con ella un mensaje que sólo nosotros podremos descifrar, ya que solo nosotros tendremos la *clave privada*.

Además, la criptografía de clave pública es útil por otras razones. Permite, entre muchas otras cosas, no solo mandar mensajes cifrados a alguien si tenemos su clave pública, sino también verificar que el que envía un mensaje es realmente quien dice ser (firma digital).

Crear pares de clave pública y privada es sencillo*:
(* si usamos Windows podemos usar [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html), pero casi mejor tener un Bash también en Windows, por otras razones como usar Git fácilmente, y las instrucciones entonces serán las mismas)

```bash
$ ssh-keygen -t rsa -C "correo_electronico@example.com"
```
Ahí seguimos los pasos, que comentamos punto por punto:

```
Generating public/private rsa key pair.
Enter file in which to save the key ($HOME/.ssh/id_rsa):
```
Le podemos dar a enter, ya que el valor por defecto está bien, y es el habitual.

```
# Enter passphrase (empty for no passphrase):
# Enter same passphrase again:
```

Aquí nos pide una clave (generalmente una frase o contraseña larga). Podemos no poner ninguna, pero mejor poner una. Cada vez que usemos la clave, tendremos que poner la clave, pero podemos hacer que el ordenador la recuerde por un tiempo si nos preocupa tener que escribirla una y otra vez.

```
Your identification has been saved in $HOME/.ssh/id_rsa.
Your public key has been saved in $HOME/.ssh/id_rsa.pub.
The key fingerprint is:
91:21:42:fc:0d:0b:f3:7a:a8:c2:2d:36:6b:14:02:d0 correo_electronico@example.com
The key's randomart image is:
+--[ RSA 2048]----+
|o+o . .          |
|. E... o         |
|.  = +o          |
| .  + ..         |
|. .o    S        |
| +o .     +      |
|=.o.             |
|+=       .       |
|+                |
+-----------------+
```
Y ya tenemos la clave. Con la clave tenemos un numerito largo, una huella de la clave, y un dibujito ASCII que nos sirve cualquiera de los dos para comprobar que una clave que nos dan es la que nos dicen que es. Es como un DNI de la clave.

La clave la tenemos en donde le indicamos que estuviera, por defecto `$HOME/.ssh`:


```
$ ls ~/.ssh
authorized_keys config id_rsa  id_rsa.pub  known_hosts
```

`id_rsa` es la clave privada. No la compartas, ni la dejes ver a otra gente.

`id_rsa.pub` es la clave pública. ¡Repártela libremente! ¡Fiesta!

`known_hosts` es un fichero que igual no tienes hasta que no te conectes a otro servidor por SSH. Irá listando servidores a los que te conectas y las huellas de sus claves públicas, para que si mañana la NSA o alguien cambia el servidor, te enteres de que algo ha cambiado.

`config` es un fichero en el que puedes especificar opciones para SSH.

`authorized_keys` es otro fichero que probablemente no tengas. Es un listado de claves públicas que permiten acceder a la máquina. Lo usará un servidor SSH para mirar si la clave es válida cuando un usuario quiere conectarse por SSH con su propia clave (y esta ya la hayamos añadido).

Por último, para que el ordenador recuerde la clave, podemos decirle al [agente](https://es.wikipedia.org/wiki/SSH-Agent) de SSH que la recuerde:

```
$ eval "$(ssh-agent -s)" # arrancamos el agente, por si no lo está
$ ssh-add ~/.ssh/id_rsa # añadimos la clave
```

## Instalando un servidor SSH

Instalar un servidor SSH depende mucho del sistema, y del servidor específico que se vaya a instalar.

Si queremos instalar uno ahora, podemos buscar en un buscador (DuckDuckGo, Google o cualquier otro) "ssh server $SISTEMA", donde SISTEMA sea el sistema operativo que usamos, posiblemente indicando la versión también.

Si tenemos problema, podemos pedir ayuda, por supuesto, pero tampoco nos centraremos demasiado en esto ya que no es el objetivo del taller actual.

## Accediendo a otra máquina por SSH

Acceder a otra máquina por SSH es muy fácil:

```
ssh usuario@host -p port
```

donde `usuario` es el usuario con el que intentamos entrar, `host` la dirección de la máquina a la que intentamos acceder, y `port` el puerto en el que escucha el servidor SSH que si es la estándar, 22, no hace falta especificar. El comando SSH tiene muchas opciones, pero éstas son las fundamentales. Para ver más información siempre tenemos las páginas man (`man ssh`).

En Windows, [PuTTy](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) nos proporciona una forma sencilla de usar SSH, aunque hay muchas más. PuTTy tiene interfaz gráfica, y con rellenar los campos que nos pide, es suficiente.

Para probar, podemos conectarnos al servidor SSH que hayamos creado en local, al de un compañero, o uno que se cree en el taller para ello.

## Configurando SSH

Con el fichero `$HOME/.ssh/config` podemos configurar muchas opciones de SSH. `man ssh_config` nos dejará ver un listado completo de opciones.

Generalmente el fichero tiene la siguiente forma:

```
HOST example.org
  opcion 1
  opcion 2
```

Opciones habituales son:

* ForwardAgent - permite usar las claves de la máquina original cuando, en una conexión SSH conectamos a su vez con otro servidor SSH. Es útil para algunos tipos de despliegues, para desarrollo con máquinas virtuales en local, y para otras cosas, pero hay que tener cuidado ya que puede ser peligroso.
* HostName - indica el verdadero *hostname* de la máquina destino. Permite usar nombres alternativos para algunos servidores. Junto con otras opciones, es muy útil (debajo hay un ejemplo).
* IdentityFile - indica qué clave (privada) usar para un servidor.
* ProxyCommand - indica qué comando ejecutar para conectarse a la máquina. Es útil si para esa máquina tenemos que usar un proxy, por ejemplo.

Hay muchas otras opciones (revisar el manual es muy útil).

Un posible ejemplo de opciones para un servidor es este:

```
Host servidor-usuario-2
    HostName example.org
    User usuario-2
    Port 2222
    IdentityFile ~/.ssh/id_rsa_usuario_2
```

Con esa configuración,

```
$ ssh example.org
```

intentará conectar con `example.org` con el usuario actual (de la máquina local), con la clave por defecto (`~/.ssh/id_rsa` si existe), al puerto 22. Pero si hiciéramos

```
$ ssh servidor-usuario-2
```

intentaríamos conectar con `example.org`, con el usuario `usuario-2`, con la clave `~/.ssh/id_rsa_usuario_2` y al puerto 2222.

## Otras herramientas que usan SSH

Muchos programas usan SSH como base para hacer algo más. Algunos ejemplos son:

* [scp](http://es.wikipedia.org/wiki/Secure_Copy) - (secure cp) copia un fichero de un servidor SSH a la máquina local
* [vnc](http://es.wikipedia.org/wiki/VNC) - conexión gráfica con otros ordenadores. Tiene su propio protocolo de comunicación, pero podemos pasarlo por SSH para hacerlo seguro.
* [rsync](http://es.wikipedia.org/wiki/Rsync) - copiar datos de una máquina a otra, permitiendo copias incrementales, y de una forma eficiente. Como vnc, tiene su protocolo, pero puede usar SSH para tener conexión segura.
* [sftp](http://es.wikipedia.org/wiki/SSH_File_Transfer_Protocol) - ftp sobre SSH, similar a scp.
* [vpn](http://es.wikipedia.org/wiki/Red_privada_virtual) - es habitual usar SSH como protocolo para los túneles en las redes privadas virtuales.

Además, otras herramientas lo usan para comunicar datos que son parte de su función: git, svn... (control de versiones), capistrano, vlad... (despliegue de aplicaciones) y muchas más.

Como ejercicio, es útil probar a copiar a local un fichero de otra máquina (scp) o alguna de las otras herramientas. Internet, los compañeros o los ponentes pueden ayudarnos a ello.
