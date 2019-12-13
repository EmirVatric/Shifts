# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :tasks, class_name: 'Task', foreign_key: 'team_id', dependent: :destroy
  has_many :teammanagers
  has_many :users, through: :teammanagers, source: 'user'
  belongs_to :team_creator, class_name: 'User', foreign_key: 'creator_id'
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true, length: { maximum: 50 }
end
