# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def logged_in?
    session[:user_id].nil? ? false : true
  end
end
