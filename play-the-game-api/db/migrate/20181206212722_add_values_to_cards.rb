class AddValuesToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :value, :integer
  end
end
