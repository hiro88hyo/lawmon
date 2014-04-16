# encoding: utf-8
require 'rubygems'
require 'sinatra'
require 'json'
require './models'

helpers do
  include Rack::Utils
  alias_method :h, :escape_html
  alias_method :u, :escape
end

# Routes
get '/' do
    erb :index
end

get '/record' do
  @records = Record.all
  @records.to_json
end

post '/record' , provides: :json do
  params = JSON.parse request.body.read
  rec = Record.create(
  :id => params['id'],
  :created_at => params['created_at'],
  :shop_name => params['shop_name'],
  :operator => params['operator']
  )
  ''
end

delete '/record/:r_id' do |r_id|
  Action.destroy_all(record_id: r_id)
  @record = Record.where(:id => r_id)
  Record.destroy(@record)
end

get '/record/:r_id/action' do |r_id|
  @actions = Action.where(:record_id => r_id)
  @actions.to_json
end

post '/record/:r_id/action', provides: :json do
  params = JSON.parse request.body.read
  act = Action.create(
  :id => params['id'],
  :record_id => params['record_id'],
  :start_time => params['start_time'],
  :end_time => params['end_time'],
  :action_id => params['action_id'],
  :crew_name => params['crew_name'],
  :action_detail => params['action_detail'],
  :notice => params['notice'])
  ''
end

delete '/record/:r_id/action/:a_id' do |r_id,a_id|
  @action = Action.where(:id => a_id)
  Action.destroy(@action)
end

get '/record/:id' do |id|
  @actions = Action.where(:record_id => id).to_a
  erb :actions
end
