require 'rails_helper'

RSpec.describe Task, type: :model do
  before :each do
    @user = User.create(name: 'test user', email: 'testuser@test.com', password: '123456')
    @team = Team.create(name: 'test team', description: 'This is a test description!', team_creator: @user)
    @task = Task.create(title: 'test task', description: 'This is a test description for task!', creator: @user, team: @team, start_time: Time.now, end_time: Time.now + 10 )
  end

  describe '#title' do
    it 'validates for presence of title' do
      @task.title = ''
      @task.valid?
      expect(@task.errors[:title]).to include("can't be blank")

      @task.title = 'test77'
      expect(@task.valid?).to eql(true)
    end
  end

  describe '#description' do
    it 'validates for presence of description' do
      @task.description = ''
      @task.valid?
      expect(@task.errors[:description]).to include("can't be blank")

      @task.description = 'This is a description for this task!'
      expect(@task.valid?).to eql(true)
    end

    it 'validates for min length of description' do
      @task.description = 'descrip'
      @task.valid?
      expect(@task.errors[:description]).to include("is too short (minimum is 10 characters)")

      @task.description = 'This is a description for this task!'
      expect(@task.valid?).to eql(true)
    end
  end

  describe '#start_time & end_time' do
    it 'validates that task does not last more that 8 hours' do
      @task2 = Task.create(title: 'test task', description: 'This is a test description for task!', creator: @user, team: @team, start_time: Time.now - 10*60, end_time: Time.now + 10*60*1000 )
      @task2.valid?
      expect(@task2.errors[:task_time]).to include("cannot last longer than 8 hours.")
    end
  end
end