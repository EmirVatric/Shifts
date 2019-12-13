# frozen_string_literal: true

class Api::RegistrationsController < ApplicationController
  include CurrentUserConcern
  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: 500, errors: user.errors.full_messages }
    end
  end

  def profile
    unless logged_in?
      render json: {
        status: 401,
        errors: 'You are not logged in'
      }
    end

    render json: {
      name: @current_user.name,
      tasks: @current_user.assigned_tasks,
      teams: @current_user.teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e
    }
  end

  private

  def user_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :name)
  end
end
