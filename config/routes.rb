# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :sessions, only: [:create]
    resources :registrations, only: [:create]
    resources :tasks, only: %i[create index update show destroy]
    resources :teams, only: %i[create index update show destroy]
    get :profile, to: 'registrations#profile'
    get :userteams, to: 'teams#userteams'
    post :assignment, to: 'tasks#assignment'
    post :timeline, to: 'tasks#timeline'
    post :jointeam, to: 'teams#join_team'
    get :count, to: 'tasks#count'
    delete :leaveteam, to: 'teams#leave_team'
    delete :assignment, to: 'tasks#unassigne'
    delete :logout, to: 'sessions#logout'
    get :logged_in, to: 'sessions#logged_in'
  end

  get '*path', to: 'homepage#index'
  root 'homepage#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
