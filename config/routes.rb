Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # expose the react fe
  get "/", to: "spa#index"
  
  # expose apis
  post "api/send_messages", to: "api#send_messages"
end
