Rails.application.routes.draw do
  namespace :api do
    resources :games, except:[:new, :edit]
  end
end
