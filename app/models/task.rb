class Task < ApplicationRecord
  before_save :status_value
  before_validation :time_difference

  validates :title, presence: true
  validates :description, presence: true,length: {minimum:10, maximum:200}
  validates :start_time, presence: true
  validates :end_time, presence: true

  def status_value
    self.status ||= false
  end

  def time_difference
    if self.start_time && self.end_time && self.start_time >= self.end_time
      errors.add(:end_time, "must be greater than start time.")
    end

    if self.start_time && self.start_time < Date.today
      errors.add(:start_time, "Start time cannot be in the past.")
    end
  end
end
