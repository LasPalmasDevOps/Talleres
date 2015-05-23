# Gestión de dependencias en Ruby

Como ejercicio, vamos a jugar un poco con la gema [Octokit](https://github.com/octokit/octokit.rb).

## Configurar el entorno de pruebas

1. Clonar el repositorio:

        git clone https://github.com/LasPalmasDevOps/Talleres.git

2. Arrancar la máquina virtual y acceder a ella:

        vagrant up
        vagrant ssh

3. Instalar Bundler:

        apt-get install bundler

4. El directorio del ejercicio es `/vagrant`:

        cd /vagrant

4. Copiar el fichero `/vagrant/netrc` a `/home/vagrant/.netrc` y ajustarlo
con el usuario y contraseña de GitHub:

        cp /vagrant/netrc ~/

## Ejercicios

1. Instalar las gemas en el directorio `vendor/bundle`
2. Ejecutar la aplicación. ¿Qué ocurre? Resolver el problema.
3. Actualizar Octokit a la versión más reciente.
4. Extra: arrancar el REPL de Ruby (`irb`) e intentar cargar cualquier gema del `Gemfile` con `require`.
¿Qué ocurre? ¿Cómo lo resolvemos?
