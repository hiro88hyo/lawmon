# encoding: utf-8
require 'rubygems'
require 'active_record'
require 'yaml'

ActiveRecord::Base.configurations = YAML.load_file('config/database.yml')
ActiveRecord::Base.establish_connection('development')
use ActiveRecord::ConnectionAdapters::ConnectionManagement

class Action < ActiveRecord::Base
end

class Record < ActiveRecord::Base
end
