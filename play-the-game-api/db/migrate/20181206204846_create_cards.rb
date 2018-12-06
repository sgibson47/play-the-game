class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.belongs_to :pile, foreign_key: true
      t.belongs_to :hand, foreign_key: true
      t.belongs_to :deck, foreign_key: true

      t.timestamps
    end
  end
end
