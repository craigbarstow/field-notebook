Rails.application.routes.draw do
  devise_for :users
  root :to => 'projects#index'

  get 'projects/map', to: 'projects#map'
  post 'projects/:id/textareas/create', to: 'text_areas#create'
  post 'projects/:id/textareas/:id/update', to: 'text_areas#update'
  post 'projects/:id/textareas/:id/destroy', to: 'text_areas#destroy'

  get "projects/search", to: "projects#index", as: "search"
  get "sort/:sort", to: "projects#index", as: "sort"

  get "projects/maps/:id", to: "maps#return_content"

  resources :projects, only: [:index, :new, :create, :show, :destroy, :edit, :update] do
    resources :text_areas, only: [:create, :update, :destroy]
    resources :photos, only: [:new, :create, :edit, :update, :destroy]
    resources :maps, only: [:new, :create]
  end
end
