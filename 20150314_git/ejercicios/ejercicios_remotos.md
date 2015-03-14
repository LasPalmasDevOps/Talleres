## 0. Directorio de trabajo

Si no tienes usuario crea una cuenta en github

## 1. Claves ssh

Si tienes clave ssh ponla en tu repositorio de github

## 2. Crear un nuevo repositorio

Crea un nuevo repositorio en github, y sincronizalo dentro de "/home/usuario/git/remoto", crea alguno ficheros y has varios commit y luego sincronizalo con github. ¿ Cuántos commit ver en github ?

## 3. Ramas

Crea en tu repositorio del paso una rama llamada "nueva-rama", cambia a esa rama y añade un archivo nuevo. Crea esa rama en github y sincroniza todas las ramas.

## 3. Sincronizar el repositorio 

En la primera parte habíamos creado un repositorio llamado "ProyectoWorld", crea un repositorio vacio en github sin ningún archivo ni similar. Una vez que lo crees accede a tu repositorio "ProyectoWorld" y ponle como repositorio remoto el que acabas de crear y sube tu trabajo a github.

## 4. Manejo de conflictos

Busca el repositorio https://github.com/LasPalmasDevOps/sandbox, hazle un fork y descárgate tu nuevo repositorio, una vez que lo descarges comprueba nuevo de rama que tienes en local y en remoto. Si no están parejas hazlo hasta que lo sean (usa git branch -vv).

Una vez que lo tengas desde tu rama master (en este orden):

- Realiza un merge a la rama "primera-rama"
- Realiza un merge a la rama "segunda-rama" 

Corrige los problemas que puedas tener, y una vez finalizado ejecuta el script.