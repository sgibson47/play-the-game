namespace :start do
  task :production do
    'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end
end