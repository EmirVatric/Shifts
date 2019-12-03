class CreateTeammanagers < ActiveRecord::Migration[5.1]
  def change
    create_table :teammanagers do |t|
      t.belongs_to :team
      t.belongs_to :user
      t.timestamps
    end
  end
end
