class CreatePiles < ActiveRecord::Migration[5.2]
  def change
    create_table :piles do |t|
      t.boolean :asc
      t.belongs_to :game, foreign_key: true

      t.timestamps
    end
  end
end
