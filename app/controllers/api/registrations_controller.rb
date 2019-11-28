class Api::RegistrationsController < ApplicationController
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

  private

  def user_params
    params.require(:registration).permit(:email,:password,:password_confirmation,:name)
  end
end