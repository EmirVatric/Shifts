class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :creator_id
      t.integer :executor_id
      t.boolean :status
      t.string :description
      t.timestamp :start_time
      t.timestamp :end_time

      t.timestamps
    end
  end
end
