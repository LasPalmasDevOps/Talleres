title: Taller de entornos de desarrollo
author:
  name: Oliver Gutiérrez (Las Palmas DevOps)
  url: https://github.com/LasPalmasDevOps
output: presentacion.html
theme: sudodoki/reveal-cleaver-theme
controls: true

--

# Entornos de desarrollo
## Python virtualenv

--

### El problema
* Necesito tener distintas versiones de bibliotecas
* Necesito tener mis dependencias aisladas
* Necesito instalar una biblioteca en una máquina que no tengo permisos

--

### La solución
* virtualenv
  * Aisla un entorno de otro
    * Bibliotecas
    * Intérprete
  * Permite desplegar más rápido en conjunto con pip
  * Los entornos virtuales se crean en donde queramos, evitando problemas de permisos

--

### Instalar virtualenv
* Gestor de paquetes del sistema:
* Usando pip
> pip install virtualenv
* Macho style (TM)
> curl -O https://pypi.python.org/packages/source/v/virtualenv/virtualenv-X.X.tar.gz
> tar xvfz virtualenv-X.X.tar.gz
> cd virtualenv-X.X
> [sudo] python setup.py install
--


### Crear un entorno virtual
> virtualenv mientorno

--

### Activar el entorno
* Desde la consola
> source mientorno/bin/activate
* Desde un script de python (WSGI, etc.)
> activate_this = '/ruta/mientorno/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

--

### Desactivar el entorno
* Captain Obvious tip: Debe estar activado para que ese comando funcione
> deactivate

--

### Opciones avanzadas
* Usar un intérprete de python específico
> virtualenv -p /ruta/python mientorno
> virtualen --python=/ruta/python mientorno
* Usar tambien el directorio site-packages del sistema
> virtualenv --system-site-packages mientorno

--

### ¡Más madera!
* virtualenvwrapper
  * Todos los entornos en el mismo sitio
  * Comandos para las operaciones más comunes
  * Un sólo comando para cambiar de un entorno a otro
  * Tab completion
  * Hooks
  * Sistema de plugins
  * Más cómodo en desarrollo, pero en mi opinión, mas lio en deployment
--

### Instalar virtualenvwrapper
* Gestor de paquetes del sistema
* Usando pip
> pip install virtualenvwrapper
> source /ruta/a/virtualenvwrapper.sh
Este último comando debería ponerse en .bashrc o equivalente.

--

### Uso de virtualenvwrapper
* Crear un entorno virtual
> mkvirtualenv mientorno
* Se activará por defecto
* ¿Y donde me lo ha creado?
  * En $HOME/.virtualenvwrapper/mientorno
  * Ver cdvirtualenv

--

### Selección de entornos
* Trabajar en un entorno
> workon mientorno
* Cambiar a otro entorno
> workon miotroentorno
* Desactivar el entorno actual
> deactivate

--

### Paquetes del entorno
* Listar instalados
  > lssitepackages
* Eliminar todos
  > wipeenv

--

### Hooks
* Antes de:
  * preactivate
  * predeactivate
  * premkproject
  * premkvirtualenv
  * prermproject
  * prermvirtualenv

--

### Hooks 2

* Después de
  * postactivate
  * postdeactivate
  * postmkproject
  * postmkvirtualenv
  * postrmproject
  * postrmvirtualenv

--

### Avanzadas
* Especificar el directorio del proyecto al crear el entorno
  > mkvirtualenv -a project_path mientorno
  * Ver comando cdproject
* Instalar dependencias al crear el entorno
  > mkvirtualenv -r archivo_requirements mientorno

--

### Y más avanzadas
* Asignar un directorio de proyecto a un entorno ya existente
  > setvirtualenvproject virtualenv_path project_path

--

### Y aún más avanzadas

* Crear un proyecto desde cero con su entorno virtual en un solo comando
  * Ver mkproject
  > mkproject [-f|--force] [-t template] [virtualenv_options] ENVNAME

--

### Y lo más avanzado de todo
* RTFM
  * [Documentación de virtualenv](https://virtualenv.pypa.io/en/latest/index.html)
  * [Documentación de virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/index.html)