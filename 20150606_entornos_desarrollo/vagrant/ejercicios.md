# Ejercicios

## Crear un proyecto Vagrant básico

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'
end
```

```
$ vagrant up
```

## Ponerle nombre a la máquina

La máquina debe llamarse **web** en vez de *default*.

```
$ vagrant destroy -f
```

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'
  config.vm.define 'web'
end
```

```
$ vagrant up
```

## Añadir otra máquina

Añadir otra máquina llamada **database**.

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'
  config.vm.define 'web'
  config.vm.define 'database'
end
```

```
$ vagrant up
```

## Redireccionar puertos

Redireccionar el puerto `80` de la máquina virtual al puerto `8080` de la máquina anfitriona. Pero sólo para la máquina **web**.

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'
  config.vm.define 'web' do |web|
    web.vm.network 'forwarded_port', guest: 80, host: 8080
  end
  config.vm.define 'database'
end
```

```
$ vagrant reload
```

## Instalar el plugin de caché

Instalar y configurar el plugin `vagrant-cachier` para cachear los paquetes del sistema.

```
$ vagrant plugin install vagrant-cachier
```

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
    config.cache.enable :apt
    config.cache.enable :apt_lists
  end

  config.vm.define 'web' do |web|
    web.vm.network 'forwarded_port', guest: 80, host: 8080
  end
  config.vm.define 'database'
end
```

```
$ vagrant reload
```

## Instalar servidor web

Instalar el servidor web Apache en la máquina **web**.

```ruby
Vagrant.configure(2) do |config|
  config.vm.box = 'hashimoto/precise64'

  if Vagrant.has_plugin?("vagrant-cachier")
    config.cache.scope = :box
    config.cache.enable :apt
    config.cache.enable :apt_lists
  end

  config.vm.define 'web' do |web|
    web.vm.network 'forwarded_port', guest: 80, host: 8080
    web.vm.provision 'shell', inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y apache2
    SHELL
  end
  config.vm.define 'database'
end
```

```
$ vagrant provision web
```

Comprueba ahora en tu navegador que está instalado el apache en la máquina virtual y que lo muestra por el puerto `8080`:

http://localhost:8080


