Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # expose ws
  mount ActionCable.server => "/cable"

  # expose the react fe
  get "/", to: "spa#index"
end
