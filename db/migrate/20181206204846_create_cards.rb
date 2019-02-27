class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.integer :value
      t.references :whereIsCard, polymorphic: true, index: true

      t.timestamps
    end
  end
end
