# encoding: utf-8
require 'rubygems'
require 'active_record'
require 'yaml'
require 'erb'

ActiveRecord::Base.configurations = YAML.load(ERB.new(File.read(File.join("config","database.yml"))).result)
use ActiveRecord::ConnectionAdapters::ConnectionManagement

p ActiveRecord::Base.configurations

class Action < ActiveRecord::Base
end

class Record < ActiveRecord::Base
end
