# Instalación

### Arch Linux

```
pacman -S git tkdiff lighttpd
```

### Debian y derivados

```
apt-get install git tkdiff lighttpd
```

### Gentoo

```
emerge --ask --verbose dev-vcs/git
emerge --ask --verbose dev-util/tkdiff
emerge --ask --verbose www-servers/ligthtpd
```

### RedHat, CentOS, fedora


```
yum install git tkdiff ligthttpd
```

### Suse

```
zypper install git tkdiff lighttpd
```

### MacOSX

.1 Forma gráfica
 
- [Git](https://code.google.com/p/git-osx-installer/)
- [Tkdiff](http://sourceforge.net/projects/tkdiff/files/tkdiff/4.2/)

.1 Usando homebrew

```
brew install git tkdiff lighttpd
```

### Windows (todavía lo usas :-( )

- [Git](http://git-scm.com/downloads)
- [Tkdiff](http://sourceforge.net/projects/tkdiff/files/tkdiff/4.2/)


# Parte local


### Estableciendo datos iniciales de git


```
git config --global user.name "Mi nombre"
git config --global user.email "minombre@midominio.com"
git config --global core.editor vim
git config --global color.ui true
```

### Establecer datos particulares dentro de un repo


Dentro de la carpeta del repo

```
git config --local user.name "Mi nombre"
git config --local user.email "minombre@otrodominio.com"
```


### Ver las opciones globales que tengo en mi máquina

``` 
git config --list
```

## Mi primer repo

### Crearlo localmente

```
$ git init mi_primer_repo
Initialized empty Git repository in /home/isra/LPDevOps/mi_primer_repo/.git/
..
$ ls -a mi_primer_repo
. .. .git
```


### Nuestro primer commit

```
$ echo "hola" > f.txt
$ git add f.txt
$ git commit -m "primer commit"
[master (root-commit) fae5ff8] primer commit
 1 file changed, 1 insertion(+)
 create mode 100644 f.txt
```

### Nuestro segundo commit

```
$ echo "adios" >> f.txt
$ git add f.txt
$ git commit -m "segundo commit"
[master d001cc9] segundo commit
 1 file changed, 1 insertion(+)
 ```

 * ¿ Qué significa root-commit ?
 * ¿ Por qué hacemos **git add** dos veces (lo veremos más adelante) ?

## Análisis de los 4 tipos de objetos de git

### Commits

```
$ git cat-file -p HEAD
tree 65de8c1fce51aedbc5b0c838d5d2be0883b3ab0e
parent fae5ff8d949952d9cfc049992bfda9bcffdaa391
author Israel Santana <isra@miscorreos.org> 1426282257 +0000
committer Israel Santana <isra@miscorreos.org> 1426282257 +0000

segundo commit
```

### Trees

* Lista de ficheros y trees
* Solo gestiona los bits de ejecución de ficheros
* No guarda directorios vacíos


```
$ git cat-file -p HEAD:
100644 blob 9114647dde3052c36811e94668f951f623d8005d  f.txt
```

### Blobs

* Son los ficheros que contiene nuestro repositorio

```
$ git cat-file -p HEAD:f.txt
hola
adios
```

### Tags

* Normalmente apuntan a commits
* Pueden firmarse mediate [GnuPG](https://www.gnupg.org/)

```
$ git tag -a v1.0 -m "version 1.0" HEAD
$ git cat-file -p v1.0
object d001cc9ddc2276f15f82f654db47320621d5e9d4
type commit
tag v1.0
tagger Israel Santana <isra@miscorreos.org> 1426284340 +0000

version 1.0
```

## Estructura física de un repositorio

Los repositorios normales tienen tres partes:

1. Directorio de trabajo
1. Grafo de objetos: .git
1. Área de preparación


### Algunos ficheros dentro de .git

```
 $ ls .git/
branches  COMMIT_EDITMSG  config  description  HEAD  hooks  
index  info  logs  objects  refs
```

#### Config

* Contiene la configuración local del repo

```
$ cat .git/config 
[core]
  repositoryformatversion = 0
  filemode = true
  bare = false
  logallrefupdates = true

```

#### description

* Descripción corta usada por gitweb

```
$ cat .git/description 
Unnamed repository; edit this file 'description' to name the repository.
```

#### HEAD

* Es una referencia simbólica a la revisión actual

```
$ cat .git/HEAD 
ref: refs/heads/master
```

#### hooks

* Se encargan de manejas los eventos

```
$ ls .git/hooks/
applypatch-msg.sample  pre-applypatch.sample      pre-push.sample
commit-msg.sample      pre-commit.sample          pre-rebase.sample
post-update.sample     prepare-commit-msg.sample  update.sample
```

#### index 

 * Contiene el área de preparación 

```
 $ git ls-files -s
100644 9114647dde3052c36811e94668f951f623d8005d 0 f.txt
```

#### info/exclude

* Patrones de los ficheros que git debe ignorar
* También podemos usar **.gitigone** 

```
$ cat .git/info/exclude 
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
```

#### logs

* Contiene los logs

```
$ git reflog 
d001cc9 HEAD@{0}: commit: segundo commit
fae5ff8 HEAD@{1}: commit (initial): primer commit
```

### refs

* Contiene referencias simbólicas a las puntas de cada rama y etiquetas

```
$ ls -R .git/refs/
.git/refs/:
heads  tags

.git/refs/heads:
master

.git/refs/tags:
v1.0
```

### objects

* Objectos

```
$ ls .git/objects/
46  5c  65  91  9a  d0  fa  info  pack
```

* Se pueden empaquetar cuando tenemos muchos (este no es el caso :p)

```
$ git gc
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (7/7), done.
Total 7 (delta 0), reused 0 (delta 0)
$ ls .git/objects/pack/
pack-6ca1c4f22503f0a4ce672fcdea373d4ee1e09aaa.idx  
pack-6ca1c4f22503f0a4ce672fcdea373d4ee1e09aaa.pack
```

## Área de preparación, caché o índice

* Es una nuestra instántanea que vamos construyendo para la próxima revisión.

* Si vienes de svn piensa que **svn add** añade un fichero a un control de versiones y **git add** añade contenido al área de preparación.

* Gracias a esto podemos controlar exactamente que ponemos en cada revisión. Al principio cuesta un poco pero es bastante potente.

* No confundir lo que hace clientes como [TortoiseSVN](http://tortoisesvn.net)

### Preparando una nueva revisión

* Sigamos con nuestro ejemplo

```
$ echo "bueno" >> f.txt
$ git add f.txt
$ echo "malo" >> f.txt
$ echo "nuevo" > g.txt
```

* Comprobamos el estado de nuestro repo

```
$ git status
En la rama master
Cambios para hacer commit:
  (use «git reset HEAD <archivo>...«para eliminar stage)

  modificado: f.txt

Cambios no preparados para el commit:
  (use «git add <archivo>...» para actualizar lo que se ejecutará)
  (use «git checkout -- <archivo>...« para descartar cambios en le directorio de trabajo)

  modificado: f.txt

Archivos sin seguimiento:
  (use «git add <archivo>...» para incluir lo que se ha de ejecutar)

  g.txt

```

* Diferencias entre el repositorio y nuestra área de preparación

```
$ git diff --staged
diff --git a/f.txt b/f.txt
index 9114647..3d0a14e 100644
--- a/f.txt
+++ b/f.txt
@@ -1,2 +1,3 @@
 hola
 adios
+bueno

```

* Diferencias entre nuestro la zona de preparación y direcotorio de trabajo 

```
$ git diff
diff --git a/f.txt b/f.txt
index 3d0a14e..ad3ec81 100644
--- a/f.txt
+++ b/f.txt
@@ -1,3 +1,4 @@
 hola
 adios
 bueno
+malo

``` 

* Diferencias entre el repositorio y nuestro directorio de trabajo

```
$ git diff HEAD
diff --git a/f.txt b/f.txt
index 3d0a14e..ad3ec81 100644
--- a/f.txt
+++ b/f.txt
@@ -1,2 +1,4 @@
 hola
 adios
+bueno
+malo
diff --git a/g.txt b/g.txt
new file mode 100644
index 0000000..36080d9
--- /dev/null
+++ b/g.txt
@@ -0,0 +1 @@
+nuevo


```
* Hagamos nuestro tercer commit 

```
$ git commit -m "tercer commit"
[master 13602d8] tercer commit
 1 file changed, 1 insertion(+)
```

```
$ git status 
En la rama master
Cambios no preparados para el commit:
  (use «git add <archivo>...» para actualizar lo que se ejecutará)
  (use «git checkout -- <archivo>...« para descartar cambios en le directorio de trabajo)

  modificado: f.txt

Archivos sin seguimiento:
  (use «git add <archivo>...» para incluir lo que se ha de ejecutar)

  g.txt

no hay cambios agregados al commit (use «git add» o «git commit -a»)
```

### Esquema para añadir y quitar

![Esquema resumen](img/esquema_anadir_y_eliminar.png)


### Esquema para comparar

![Esquema resumen](img/esquema_comparacion.png)

### Modificar nuestro commit

* Veamos el estado de nuestro repo

```
$ git log --pretty=oneline
75990e36004ed3089da2ab0232944e93144a9b8d tercer commit
d001cc9ddc2276f15f82f654db47320621d5e9d4 segundo commit
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer commit
```

```
$ git status 
En la rama master
Archivos sin seguimiento:
  (use «git add <archivo>...» para incluir lo que se ha de ejecutar)

  g.txt

no se ha agregado nada al commit pero existen archivos sin seguimiento (use «git add» para darle seguimiento)
```

* Nos hemos dado cuenta que nos faltó añadir nuestro archivo g.txt y lo queremos en ese commit


```
$ git add g.txt 
$ git commit --amend -m "tercer commit"
[master 6d088e0] tercer commit
 2 files changed, 3 insertions(+)
 create mode 100644 g.txt
```

```
$ git log --pretty=oneline
6d088e0572b73a2493c84b9907cc8e26b7e22029 tercer commit
d001cc9ddc2276f15f82f654db47320621d5e9d4 segundo commit
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer commit
```

```
$ git status 
En la rama master
nothing to commit, working directory clean
```

### Moviendo ficheros en git

* Lo hacemos con la opción mv

```
$ git mv g.txt h.txt
$ git status
En la rama master
Cambios para hacer commit:
  (use «git reset HEAD <archivo>...«para eliminar stage)

  renombrado: g.txt -> h.txt
```

### Borrando commit

* Borrado los dos últimos commit y dejando todo antes de hacer el commit

```
$ git reset HEAD~2
$ git log --pretty=oneline
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer commit
$ git status
En la rama master
Cambios no preparados para el commit:
  (use «git add <archivo>...» para actualizar lo que se ejecutará)
  (use «git checkout -- <archivo>...« para descartar cambios en le directorio de trabajo)

  modificado: f.txt

Archivos sin seguimiento:
  (use «git add <archivo>...» para incluir lo que se ha de ejecutar)

  g.txt

no hay cambios agregados al commit (use «git add» o «git commit -a»)
```

* Ahora hacemos el segundo commit

```
$ git add .
$ git commit -m "segundo commit"
[master 7b63fcb] segundo commit
 2 files changed, 4 insertions(+)
 create mode 100644 g.txt
$ git log --pretty=oneline
7b63fcbd434de60b237a64108bee328caa699660 segundo commit
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer commit
```

* Borrado de verdad (no hay marcha atrás !!!!!!!), borraremos todo desde nuestro primer commit

```
$ git reset --hard fae5ff8
HEAD is now at fae5ff8 primer commit
$ git log --pretty=oneline
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer 
$ git status 
En la rama master
nothing to commit, working directory clean
$ ls
f.txt
```

## Operaciones comunes

* **git grep**: como grep -R, pero sólo busca ficheros versionados

```
$ git grep hola
f.txt:hola
```

* **git log**: un histórico

```
$ git log
commit fae5ff8d949952d9cfc049992bfda9bcffdaa391
Author: Israel Santana <isra@miscorreos.org>
Date:   Fri Mar 13 21:28:41 2015 +0000

    primer commit
```

```
$ git log --pretty=oneline
fae5ff8d949952d9cfc049992bfda9bcffdaa391 primer commit
```

```
$ git log  --graph --pretty=oneline --decorate=short --abbrev-commit
* 9247034 (HEAD, feature-x) sexto commit
* 64672ec quinto commit
* 2ab764b cuarto commit
* 41871b0 tercer commit
* c99b9d6 segundo commit
* fae5ff8 primer commit
```

* Por autor: --author, --committer
* Por fecha: --since, --until
* Por mensaje: --grep

* **git show revision**, muestra la revision
* **git instaweb**, nos muestra el repo vía web

## Ayuda

### Genérica

* **git help** listado breve (porcelana)
* **git help --all** listado completo (fontanería)

### Concreta

* **man git-orden**
* **git help orden**
* **git help -w orden**
* **git orden -h**


## Ejercicios primera parte

* [Aquí los tienes](ejercicios/ejercicios_locales.md)

# Parte remota

