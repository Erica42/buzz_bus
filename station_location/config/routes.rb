Rails.application.routes.draw do
  resources :locations, only: [:index, :create, :new]

  resources :users, only: [:show, :create, :new]

  resources :sessions, only: [:new, :create, :destroy]
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'

  root 'locations#index'
end
