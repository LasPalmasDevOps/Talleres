# Taller Git II

## Repositorios

Los repositorios están compuestos por 3 elementos principales:

 * Archivos.
 * Los cambios de los archivos (histórico).
 * Metadatos del repositorio.

Cada repositorio funciona localmente, es independiente y tienen la importancia que les demos. Ninguno es *el principal*, salvo que le demos esa función.

### Crear un repositorio

Subcomando `init` y nombre del repositorio:

```
$ git init mi_repo
Initialized empty Git repository in /home/user/mi_repo/.git/
...
```

Si se lanza el la orden sin nombre de repositorio se usará el directorio actual.

### Clonar un repositorio

Subcomando `clone` más la URL del repositorio:

```
$ git clone https://github.com/LasPalmasDevOps/Talleres.git
Clonar en «Talleres»...
remote: Counting objects: 468, done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 468 (delta 16), reused 0 (delta 0), pack-reused 434
Receiving objects: 100% (468/468), 729.52 KiB | 680.00 KiB/s, done.
Resolving deltas: 100% (190/190), done.
Checking connectivity... hecho.
```

Esto copia el contenido (archivos, histórico y metadatos) de un repositorio.
El repositorio que se copia puede ser local o remota. Los protocolos que se pueden usar en las URL son:
 
* git
* ssh
* http
* https
* rysnc
* file

Ejemplos:

```
$ git clone https://github.com/LasPalmasDevOps/Talleres.git
$ git clone ssh://git@github.com/LasPalmasDevOps/Talleres.git
$ git clone git://server.com/Talleres.git
$ git clone file:///var/git/Talleres.git
```

Se puede indicar también el nombre del directorio local que se va a crear para la copia local del repositorio:

```
$ git clone https://github.com/LasPalmasDevOps/Talleres.git talleres_lpa_devops
Clonar en «talleres_lpa_devops»...
remote: Counting objects: 468, done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 468 (delta 16), reused 0 (delta 0), pack-reused 434
Receiving objects: 100% (468/468), 729.52 KiB | 680.00 KiB/s, done.
Resolving deltas: 100% (190/190), done.
Checking connectivity... hecho.
$ ls
talleres_lpa_devops
```

### Referencias a otros repositorios

Un repositorio puede guardar referencias a otros repositorios similares para intercambiar con ellos cambios.
La forma de referenciar a estos remotos es mediante una URL y un alias, este conjunto se llama `remote`.

Con el subcomando `remote` podemos listar las referencias que tiene un repositorio:

```
$ git remote -v
origin  git@github.com:LasPalmasDevOps/Talleres.git (fetch)
origin  git@github.com:LasPalmasDevOps/Talleres.git (push)
```

Veamos qué significa cada cosa:
 * `origin`: Es el nombre del `remote`. Podemos llamarlo cómo queramos, es un alias a la URL, pero el primero que se crea cuando clonamos un repositorio siempre se crear con el nombre **origin**.
 * La URL.
 * Operación: `fetch` o `push`.

La forma de comunicarse con otros repositorios puede ser:

 * **fetch**: Recibir los cambios de otro repositorio.
 * **push**: Enviar cambios a otro repositorio.


## Ramas

El histórico de cambios de los archivos de un repositorio se representa como una sucesión lineal de cambios (*commits*). Pero podemos tener más de una línea de cambios en un mismo repositorio.

A cada una de esas líneas de cambios sucesivos se le llama *ramas* (*branches*) y puede haber todas las que queramos.

### Mostrar ramas

Subcomando `branch` sin parámetros:

```
$ git branch
* master
```

> **NOTA**: El asterisco indica la rama actual.

### Crear una rama

Subcomando `branch` más el nombre de la nueva rama:

```
$ git branch nueva-rama
$ git branch
* master
  nueva-rama
```

La nueva rama creada será una copia de la rama en la que estemos en ese momento. En el ejemplo sería una copia de `master`.


### Cambiar de rama

Subcomando `checkcout` más el nombre de la rama:

```
$ git checkout nueva-rama
Switched to branch 'nueva-rama'
```

> *TIP*: Para hacer las dos cosas a la vez `git checkout -b nueva-rama`

### Borrar una rama

Subcomando `branch` más la opción `-d` y el nombre de la rama a borrar:

```
$ git branch -d nueva-rama
$ git branch
* master
```

> *NOTA*: Sólo se borrarán de esta forma ramas que ya hayan sido unidas (*merge*). En caso contrario debería usarse el modificador `-D`:

```
$ git branch -D nueva-rama
$ git branch
* master
```

### Rama temporal

Existe una rama temporal que funciona a modo de *pila* y que puede usarse para guardar cambios locales temporales.
Esto resulta muy útil (además de en otras ocasiones) cuando necesitamos actualizar cambios remotos, pero tenemos cambios locales que aún no hemos añadido al histórico y no queremos perder.

Para trabajar con dicha rama temporal tenemos el subcomando `stash`:

 * Añadir los cambios actuales:

```
$ git stash
Saved working directory and index state WIP on master: 675ccf0 solutions of the exercises
HEAD is now at 675ccf0 solutions of the exercises
```

 * Listar los cambios locales guardados en la *pila* `stash`:

```
$ git stash list
stash@{0}: WIP on master: 675ccf0 solutions of the exercises
```

 * Recuperar los últimos cambios guardados en la *pila* `stash`:

```
$ git stash pop
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   README.md
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       20150314_git/taller_2.md
no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (f07d957a407f4efa09f11afd881bfa8f95586c67)
$ git stash list

```

 * Descartar, **sin aplicar**, los últimos cambios de la *pila* `stash`:

```
$ git stash drop
Dropped refs/stash@{0} (f07d957a407f4efa09f11afd881bfa8f95586c67)
$ git stash list

```


### Mezcla de ramas

Las ramas se suelen usar por diferentes motivos:

 * Experimentar con alguna idea.
 * Desarrollar alguna característica sin entrar en conclicto con el código estable o el resto del equipo.
 * Solucionar un *bug*.

Pero normalmente el destino final de la rama es ser fusionada con el código principal del proyecto (la rama principal) o descartarse y eliminarse.

A la hora de unir las ramas hay varias estrategias:

 * **fast-forward**: *Lineal*.
 * **rebase**: Reorganizando el histórico.
 * **squash**: Como un único *commit*.
 * **cherry-pick**: Usando sólo un *commit* de la rama a unir.

El subcomando para unir las ramas es `merge` (salvo para el caso de `cherry-pick`):

```
(nueva-rama)$ git checkout master
Switched to branch 'master'
(master)$ git merge nueva-rama
Updating d27e49f..0654c1b
Fast-forward
 a.txt | 1 +
 1 file changed, 1 insertion(+)
```


## Comunicación entre repositorios

Como vimos antes, la forma de comunicarse entre repositorios es mediante las operaciones:

 * `fetch`: Obtener cambios de otro repositorio.
 * `push`: Enviar cambios a otro repositorio.

Normalmente al "obtener cambios de otro repositorio" se suele asociar con la operación `pull`, pero la realidad es que `pull` es la combinación de las operaciones: `fetch` y `merge`.
Es decir, obtiene loca cambios y, luego, hace un `merge` de dichos cambios con la rama actual.


