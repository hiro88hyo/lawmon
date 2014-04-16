# encoding: utf-8
require 'rubygems'
require 'active_record'
require 'yaml'
require 'csv'

ActiveRecord::Base.configurations = YAML.load(ERB.new(File.read(File.join("config","database.yml"))).result)
ActiveRecord::Base.establish_connection()
use ActiveRecord::ConnectionAdapters::ConnectionManagement

class Action < ActiveRecord::Base
  def self.to_csv(rec_id)
    headers = %w(クルー名 項目 内容詳細 開始時刻 終了時刻 気付き)
    csv_data = CSV.generate(headers: headers, write_headers: true, force_quotes: true) do |csv|
      where(:record_id => rec_id).each do |row|
        data = []
        data << row[:crew_name]
        data << row[:action_id]
        data << row[:action_detail]
        data << row[:start_time].strftime("%Y/%m/%d %H:%M:%S")
        data << row[:end_time].strftime("%Y/%m/%d %H:%M:%S")
        data << row[:notice]
        csv << data
      end
    end
    csv_data
  end
end

class Record < ActiveRecord::Base
end
