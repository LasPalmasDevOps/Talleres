#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

client = Octokit::Client.new(netrc: true)
client.login

user = client.user

rows = []
rows << ["Login", Rainbow(user.login).red]
rows << ["Name", Rainbow(user.name).green]
rows << ["Location", Rainbow(user.location).green]
rows << ["URL", Rainbow(user.url).blue]
table = Terminal::Table.new(rows: rows)

puts table
