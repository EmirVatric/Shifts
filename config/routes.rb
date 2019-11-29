Rails.application.routes.draw do
  namespace :api do
    resources :sessions, only: [:create]
    resources :registrations, only: [:create]
    resources :tasks, only: [:create, :index, :update, :destroy]
    delete :logout, to: "sessions#logout"
    get :logged_in, to: "sessions#logged_in"
  end

  get '*path', to: 'homepage#index'
  root 'homepage#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
