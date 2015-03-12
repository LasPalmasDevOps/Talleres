title: Taller de sistemas de control de versiones
author:
  name: Israel Santana
  twitter: kamaxeon
output: presentacion.html
theme: sudodoki/reveal-cleaver-theme
controls: false

--

# Las Palmas DevOps
## Talleres

--

# Sistemas de control de versiones (VCS)
## Introducción

--

## ¿Os suena ?

* ¿ Cuál era la última versión ?
* ¿ Cómo vuelvo a la versión anterior ?
* ¿ Cómo consolido los cambios ?
* Los dos hemos modificado el mismo fichero

--

### ¿Qué nos ofrece un VCS ?

* Llevar un historial de cambios.
* Poder colaborar con otros.
* Crear fork de un proyecto.
* Recuperar cambios.

--

## Tipos de VCS I

### Sin red, un sólo desarollador
  * 1972 -> Source Code Control System
  * 1980 -> Revision Control System

--

## Tipos de VCS II

### Centralizados
  * 1986 -> Concurrent Version System (CVS)
  * 1999 -> Subversion ("CVS done right")

<img src="img/centralizados.png">

--

## Tipos de VCS III

### Distribuidos
  * 2001 -> Arch, Monotone
  * 2002 -> Darcs
  * 2005 -> Git, Mercurial (hg), Bazaar (bzr)

<img src="img/distruidos.png">


--

## Ventajas de los VCS

   * Rapidez
   * Revisiones pequeñas y sin molestar
   * Trabajar sin conexión
   * Robusto (backup)

--

## Desarrollo del Kernel I
### Inicio kernel Linux
  * Parches y tar.gz

--

## Desarrollo del Kernel II
### BitKeeper
  * 02/2002 BitMover regala licencia
  * 04/2005 BitMover retira Licencia
  
--

## Desarrollo del Kernel III
### Nacimiento de Git
  * 04/2005 Presentado por Linus T., ya usa ramas
  * 06/2005 Git se usa para gestionar el kernel
  * 02/2007 Git 1.5.0, versión usable para el resto
  * 03/2015 Versión 2.3.2

--

## ¿ Qué es Git ?

 * Un grafo orientado aclícico de objetos
 * Objetos: commit, tree, blob y tag
 * Los objetos son inmutables
 * Son direccionables por su contenido (resumen SHA1)

--

## Cuando no deberías usar Git

 * No para almacenar ficheros binarios
 * No sirve como backup (no guarda metadatos)
