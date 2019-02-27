class CreateHands < ActiveRecord::Migration[5.2]
  def change
    create_table :hands do |t|
      t.belongs_to :game, foreign_key: true

      t.timestamps
    end
  end
end
