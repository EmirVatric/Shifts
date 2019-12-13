# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  before :each do
    @user = User.create(name: 'test user', email: 'testuser@test.com', password: '123456')
  end

  describe '#email' do
    it 'validates for presence of email adress' do
      @user.email = ''
      @user.valid?
      expect(@user.errors[:email]).to include("can't be blank")

      @user.email = 'test3334@gmail.com'
      @user.valid?
      expect(@user.errors[:email]).to_not include("can't be blank")
    end

    it 'validates for format of email adress' do
      @user.email = 'test@test..com'
      @user.valid?
      expect(@user.errors[:email]).to include('is invalid')

      @user.email = 'test3334@gmail.com'
      @user.valid?
      expect(@user.errors[:email]).to_not include('is invalid')
    end

    it 'validates email uniquness' do
      user = User.new
      user.name = 'test33'
      user.email = 'testuser@test.com'
      user.password = '123456'
      user.valid?
      expect(user.errors[:email]).to include('has already been taken')

      user.name = 'test33'
      user.email = 'testgen22@test.com'
      user.password = '123456'
      expect(user.valid?).to eql(true)
    end
  end

  describe '#name' do
    it 'validates for presence of name' do
      @user.name = ''
      @user.valid?
      expect(@user.errors[:name]).to include("can't be blank")

      @user.name = 'test77'
      expect(@user.valid?).to eql(true)
    end
  end

  describe '#password' do
    it 'validates the presence of password' do
      @user.password_digest = ''
      @user.valid?
      expect(@user.errors[:password]).to include("can't be blank")

      @user.password = '123456'
      expect(@user.valid?).to eql(true)
    end

    it 'validates the password confirmation' do
      @user.password = '1234567'
      @user.password_confirmation = '123456'
      @user.valid?
      expect(@user.errors[:password_confirmation]).to include("doesn't match Password")

      @user.password = '123456'
      expect(@user.valid?).to eql(true)
    end
  end
end
