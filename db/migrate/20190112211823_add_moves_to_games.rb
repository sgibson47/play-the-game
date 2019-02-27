class AddMovesToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :moves, :integer
  end
end
