# encoding: utf-8
require 'rubygems'
require 'active_record'
require 'yaml'
require 'erb'

ActiveRecord::Base.configurations = YAML.load(ERB.new(File.read(File.join("config","database.yml"))).result)
use ActiveRecord::ConnectionAdapters::ConnectionManagement

class Action < ActiveRecord::Base
end

class Record < ActiveRecord::Base
end
