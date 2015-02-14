# timezone for all nodes
class { 'timezone':
timezone => 'America/Gotham',
}

node 'web' {
# web files
$selector_dirs = [ "/home/web", "/home/web/example.com", "/home/web/example.com/app",  "/home/web/example.com/www" ]
file { $selector_dirs:
ensure => "directory",
mode => 0755,
}

#  # test apache with php
#  file { '/home/web/example.com/app/a.php':
#    ensure => present,
#    mode => 0644,
#    content => '<?php echo "hi at " . date("r") . "\n";',
#  }

# ssh
class { 'ssh':
server_options => {
'Port' => [22,22199],
},
client_options => {
'Host bitbucket.org' => {
'IdentityFile' => '~/.ssh/identities/fake.rsa',
},
},
}
$ssh_dirs =  ['/root/.ssh', '/root/.ssh/identities']
file { $ssh_dirs:
ensure => "directory",
mode => 0700,
}
file { '/root/.ssh/identities/fake.rsa':
ensure => present,
mode => 0600,
content => "-----BEGIN RSA PRIVATE KEY-----
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000
-----END RSA PRIVATE KEY-----\n",
}
file { '/root/.ssh/identities/fake.rsa.pub':
ensure => present,
mode => 0600,
content => "ssh-rsa 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 root@fake\n",
}

# php-cli
php::ini { '/etc/php5/cli/php.ini': }
class { 'php::cli':
inifile => '/etc/php5/cli/php.ini',
}

# composer
class { 'composer':
target_dir => '/usr/local/bin',
composer_file => 'composer',
suhosin_enabled => false,
}

# apache
class { 'apache': 
mpm_module => 'prefork', 
}
class { '::apache::mod::php': }
apache::mod { 'rewrite': }
apache::vhost { "app.example.com":
port => 80,
docroot => "/home/web/example.com/app/web",
directories => [
{ path => "/home/web/example.com/app/web",
allow_override => ['All'],
options => ["-Indexes", "+FollowSymLinks", "+MultiViews"],
},
],
}
apache::vhost { "app2.example.com":
port => 80,
docroot => "/home/web/example.com/app2/web",
directories => [
{ path => "/home/web/example.com/app2/web",
allow_override => ['All'],
options => ["-Indexes", "+FollowSymLinks", "+MultiViews"],
},
],
}

# mysql
class { '::mysql::server':
root_password => 'fake.',
override_options => {
'mysqld' => {
'old_passwords' => 'true',
},
},
users => {
'fake@localhost' => {
ensure => present,
password_hash => 'fake',
},
},
grants => {
'fake@localhost/fake1.*' => {
ensure => present,
options => ['GRANT'],
privileges => ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
table => 'fake1.*',
user => 'fake@localhost',
},
'fake@localhost/fake2.*' => {
ensure => present,
options => ['GRANT'],
privileges => ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE'],
table => 'fake2.*',
user => 'fake@localhost',
},
'fake@localhost/fake3.*' => {
ensure => present,
options => ['GRANT'],
privileges => ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE'],
table => 'fake3.*',
user => 'fake@localhost',
},
},
databases => {
'fake1' => {
ensure => present,
charset => 'latin1',
collate => 'latin1_swedish_ci',
},
'fake2' => {
ensure => present,
charset => 'latin1',
collate => 'latin1_swedish_ci',
},
'fake3' => {
ensure => present,
charset => 'latin1',
collate => 'latin1_swedish_ci',
},
},
}

class { '::mysql::bindings':
php_enable => true,
}

# locales
$locale_packages = [ 'language-pack-es', 'language-pack-en' ]
package { $locale_packages:
ensure => present,
}
class { 'locales':
default_locale => 'es_ES.UTF-8',
locales => ['es_ES.UTF-8 UTF-8'],
require => Package[$locale_packages],
}
}

node 'streaming' {
# web files
$streaming_dirs = [ "/home/web", "/home/web/example.com", "/home/web/example.com/streaming" ]
file { $streaming_dirs:
ensure => "directory",
mode => 0755,
}

# locales
$locale_packages = [ 'language-pack-es', 'language-pack-en' ]
package { $locale_packages:
ensure => present,
}
class { 'locales':
default_locale => 'es_ES.UTF-8',
locales => ['es_ES.UTF-8 UTF-8'],
require => Package[$locale_packages],
}

# php-fpm
include php::fpm::daemon

php::fpm::conf { 'www':
listen  => '127.0.0.1:9000',
user => 'www-data',
}

# nginx
class { 'nginx': }
nginx::resource::vhost { 'streaming.example.com':
www_root => '/home/web/example.com/streaming',
vhost_cfg_append => {
"add_header" => "Access-Control-Allow-Headers \"X-Requested-With\";\n  add_header Access-Control-Allow-Methods \"GET, HEAD, OPTIONS\";\n  add_header Access-Control-Allow-Origin  \"*\"",
},
}
nginx::resource::location { "streaming":
vhost => "streaming.example.com",
www_root => '/home/web/example.com/streaming',
location        => '~ \.php$',
fastcgi         => "127.0.0.1:9000",
}
nginx::resource::vhost { 'streaming2.example.com':
www_root => '/home/web/example.com/streaming',
vhost_cfg_append => {
"add_header" => "Access-Control-Allow-Headers \"X-Requested-With\";\n  add_header Access-Control-Allow-Methods \"GET, HEAD, OPTIONS\";\n  add_header Access-Control-Allow-Origin  \"*\"",
},
}
nginx::resource::location { "streaming2":
vhost => "streaming2.example.com",
www_root => '/home/web/example.com/streaming',
location        => '~ \.php$',
fastcgi         => "127.0.0.1:9000",
}
nginx::resource::upstream { 'app':
members => [
'fake.vm.icc:80',
],
}

nginx::resource::vhost { 'app.example.com':
proxy => 'http://app',
}
}

# applies to nodes that aren't explicitly defined
node default {
file {'/tmp/example-ip':
ensure => present,
mode => 0640,
content => "public IP: ${ipaddress}.\n",
}
}

