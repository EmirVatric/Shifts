class User < ApplicationRecord
  has_secure_password
  has_many :created_tasks, class_name: "Task", foreign_key: "creator_id"
  has_many :managers
  has_many :assigned_tasks, through: :managers, source: 'task'

  has_many :teammanagers
  has_many :teams, through: :teammanagers, source: 'team'

  has_many :created_teams, class_name: 'Team', foreign_key: "creator_id"


  def day_tasks(day)
    self.assigned_tasks.where(start_time: Date.parse(day).beginning_of_day..Date.parse(day).end_of_day).order('start_time ASC')
  end

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :name, presence: true
end
