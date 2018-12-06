class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.boolean :status
      t.string :playerName

      t.timestamps
    end
  end
end
