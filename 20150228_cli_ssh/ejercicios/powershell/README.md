# Taller de Bash

### Introducción

Esta pequeña guía intenta explicar lo mismo que en la parte de [bash](../bash/README.md) pero para powershell.

### Ayuda

En powershell hay varias maneras de obtener ayuda.
```
Get-Help -Name comando
help comando
gm
Get-Member
help about_*
```

También existe los Cmdlets
```
Cmdlets
Verb-Noun
Get-Command
```

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
> **TIP**: Casi todos los comandos son realmente alias de PowerShell, ejecuta _Get-Alias_ para ver todos lo que hay definidos en PowerShell

## Acciones básicas (The Powershell way)

* Mostrar algo por pantalla
```
$ "Texto"
Write-Output "Texto"
```

* Listar archivos y directorios
```
$ Get-ChildItem -Path Path
```

* Crear directorio
```
$ New-Item -Name Name -Path Path
```

* Borrar directorio 
```
$ Remove-Item -Path Path

```

* Moverse de un directorio a otro
```
$ Set-Location -Path Path
```

* Borrar archivo
```
$ Remove-Item -Path Path
```

* Ver el contenido de un archivo 
```
$ Get-Content -Path Path
```

* Mover o renombrar un archivo o directorio
```
Move-Item -Path Path -Destination DestinationPath
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
$ $variable="String"
$ $variable=10
$ ${variable con espacio}="String"
```

Ver valor de una variable:
```
$ Write-Output $variable
valor
```

### Variables de entorno

Las variables se definen en el ámbito local, es decir, que una vez se acaba el *script* o *shell* en dónde se definió, la variable desaparece.
Pero hay variables que *viven* durante toda la sesión, son las llamadas variables de entorno y que se suelen definir al hacer *login* en el sistema o arrancarse la *shell*.


```
$ Get-ChildItem -Path env:
$ $env:foo = "bar"
$ $env:foo
```


Para ver las variables de entorno disponibles se puede lanzar la orden `Get-ChildItem -Path env`

### Ejercicios

1. Mostrar por pantalla cuál es el directorio actual, usando únicamente la orden `echo` (*Pista*: se pueden usar las variables que haga falta).
1. Crea una variable llamada `VAR` que contenga el valor `Esto es una prueba`.
1. Cambia el valor de la variable `VAR` para que contenga `20`.
1. Comprobar si la variable está entre las variables de entorno.
1. Si no lo está, hacer que lo esté.
1. Mostrar por pantalla una línea similar a la siguiente, pero con los datos de tu sistema. No puedes escribir diréctamente lo que está entre comillas:
```
Hola, soy "Pepe", vivo en "/Users/pepe", aunque ahora estoy en "/home/pepe/pruebas".
```


## Configuración de la shell

Como en cualquier programa Bash se puede configurar. La configuración es bastante flexible y dinámica, porque se basa, en gran medida, en  las variables de entorno que antes explicamos. Estas variables se guardan en archivos de configuración.

En estos archivos de configuración se pueden definir variables de entorno que siempre usamos o crear alias para operaciones que hacemos con frecuencia.
También es útil para redefinir valores de variables de entorno como el `PATH` o `PS1`.

```
$ . file_rc.ps1
```



### Ejercicios

1. Hacer que cuando se abra otra *shell* esté disponible la variable `MY_VAR` con valor `100`.
1. Abrir otra *shell* y comprobar que está disponible dicha variable.
1. Hacer que en las nuevas sesiones, cuando se lance la orden `list`, se lance realmente la orden `ls`.



## Entrada y salida

### Descriptores

En PowerShell hay 10 descriptores

1. stdin
1. stdout (write-output, normal cmdlet output, non captured expression output)
1. stderr (write-error, throw, cmdlet non-terminating errors)
1. warnings (write-warning, cmdlet warning)
1. verbose (write-verbose and cmdlet -verbose output)
1. debug (write-debug and cmdlet debug output)
1. host (write-host, read-host, explicit out-host use)
1. combined (all output combined into a single - easy to redirect stream)

* Redirecciones
```
$ >  o  comando | Out-File -Path Path
```
```
$ <  o  Write-Output | comando
```
```
```
* Tuberías (*pipes*)

1. ByValue
1. ByPropertyName


### Condiciones

Tanto en los bucles como en las estructuras condicionales se usan condiciones para tomar una decisión (seguir en el bucle, salir del bucle o tomar un camino u otro de la bifurcación).

La condición puede ser una comparación entre dos elementos o la ejecución de una orden, lo importante es que el resultado de un valor entero. Si ese valor es 0, se considerará que se cumple la condición, si es distinto de 0, no se cumple.

### Bucles

* `foreach`
```
$ foreach ($foo in $collection) { Write-Output $foo }
$ comando | Foreach-Object -Process { Comandos }    (%)
$ comando | Where-Object -FilterScript { Comandos }   (?)
```

### Operadores de comparación (los más usados)

* -eq
* -ne
* -le
* -ge
* -lt
* -gt
* -match
* -cmatch
* -nomatch
* -like
* -in
* -contains

### Operadores lógicos
* -and
* -or
* -not

### Condicionales

* `if`
```
$ if (condición) { comandos }
```
* `elseif`
```
elseif ( condición ) { comandos }
```
* `else`
```
else { comandos }
```

### Mostrar error si no existe la variable

Usando _Test-Path_ podemos comprobarlo
```
$ Test-Path -Path variable:foo
```
