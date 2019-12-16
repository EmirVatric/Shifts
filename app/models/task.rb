# frozen_string_literal: true

class Task < ApplicationRecord
  before_save :status_value
  before_validation :time_difference
  before_validation :difference

  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :team, class_name: 'Team', foreign_key: 'team_id'
  has_many :managers
  has_many :assignees, through: :managers, source: 'user'

  validates :title, presence: true
  validates :description, presence: true, length: { minimum: 10, maximum: 200 }
  validates :start_time, presence: true
  validates :end_time, presence: true

  def status_value
    self.status ||= false
  end

  def time_difference
    return errors.add(:start_time, 'must be included.') if start_time.nil?
    return errors.add(:end_time, 'must be included.') if end_time.nil?

    errors.add(:end_time, 'must be greater than start time.') if start_time >= end_time

    errors.add(:start_time, 'time cannot be in the past.') if start_time && start_time < Date.today
  end

  def difference
    return errors.add(:start_time, 'must be included.') if start_time.nil?
    return errors.add(:end_time, 'must be included.') if end_time.nil?

    errors.add(:task_time, 'cannot last longer than 8 hours.') if end_time - start_time > 28_800
  end
end
