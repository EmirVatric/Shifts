class Api::SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
            .find_by(email: params["session"]["email"])
            .try(:authenticate, params["session"]["password"])

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 401, errors:'Invalid credentials' }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user,
        id: @current_user.id
      }
    else
      render json: {
        logged_in: false,
        user: {
          name: '',
          id: ''
        }
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end