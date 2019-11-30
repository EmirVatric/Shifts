class User < ApplicationRecord
  has_secure_password
  has_many :created_tasks, class_name: "Task", foreign_key: "creator_id"
  has_many :managers
  has_many :assigned_tasks, through: :managers, source: 'task'

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
end
