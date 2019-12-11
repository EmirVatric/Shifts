class CreateManagers < ActiveRecord::Migration[5.1]
  def change
    create_table :managers do |t|
      t.belongs_to :user
      t.belongs_to :task

      t.timestamps
    end
  end
end
