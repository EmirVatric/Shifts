# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  before :each do
    @team = Team.create(name: 'test team', description: 'This is a test description!')
  end

  describe '#name' do
    it 'validates for presence of name' do
      @user = User.create(name: 'test user', email: 'testuser@test.com', password: '123456')
      @team.team_creator = @user
      @team.name = ''
      @team.valid?
      expect(@team.errors[:name]).to include("can't be blank")

      @team.name = 'test77'
      expect(@team.valid?).to eql(true)
    end
  end

  describe '#team_creator' do
    it 'validates for presence of team creator' do
      @user = User.create(name: 'test user', email: 'testuser@test.com', password: '123456')
      @team.valid?
      expect(@team.errors[:team_creator]).to include('must exist')

      @team.team_creator = @user
      expect(@team.valid?).to eql(true)
    end
  end

  describe '#description' do
    it 'validates for presence of description' do
      @user = User.create(name: 'test user', email: 'testuser@test.com', password: '123456')
      @team.team_creator = @user
      @team.description = ''
      @team.valid?
      expect(@team.errors[:description]).to include("can't be blank")

      @team.description = 'This is a test description!'
      expect(@team.valid?).to eql(true)
    end
  end
end
