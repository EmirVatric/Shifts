# frozen_string_literal: true

class Api::TeamsController < ApplicationController
  include CurrentUserConcern

  def userteams
    raise 'You are not allowd to access this site!' unless logged_in?

    teams = @current_user.teams

    render json: {
      status: 200,
      teams: teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e,
      teams: []
    }
  end

  def create
    raise 'You are not allowd to access this site!' unless logged_in?

    team = Team.new(team_params)
    team.team_creator = @current_user

    if team.save
      render json: {
        status: :created,
        team: team
      }
    else
      render json: {
        status: 500,
        errors: team.errors.full_messages
      }
    end
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e
    }
  end

  def index
    teams = Team.all.map do |team|
      creator = team.team_creator
      members = team.users.map(&:name)
      teams = {
        id: team.id,
        name: team.name,
        description: team.description,
        creator: creator.name,
        members: members
      }
    end

    render json: {
      status: 200,
      teams: teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e,
      temas: []
    }
  end

  def join_team
    raise 'Please first loggin!' unless logged_in?

    team = Team.find(params[:data])

    @current_user.teams << team

    teams = Team.all.map do |t|
      creator = t.team_creator
      members = t.users.map(&:name)
      teams = {
        id: t.id,
        name: t.name,
        description: t.description,
        creator: creator.name,
        members: members
      }
    end

    render json: {
      status: 200,
      teams: teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e,
      temas: []
    }
  end

  def leave_team
    raise 'Please first loggin!' unless logged_in?

    team = Team.find(params[:data])
    raise 'This team does not exists' if team.nil?

    teammanager = Teammanager.where('user_id = ? AND team_id = ?', @current_user.id, team.id).first
    raise 'You are not part of this team' if teammanager.nil?

    teammanager.destroy
    teams = Team.all.map do |t|
      creator = t.team_creator
      members = if !t.users.empty?
                  t.users.map(&:name)
                else
                  []
                end
      teams = {
        id: t.id,
        name: t.name,
        description: t.description,
        creator: creator.name,
        members: members
      }
    end

    render json: {
      status: 200,
      teams: teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e,
      temas: []
    }
  end

  def update
    team = Team.find(params[:id])
    raise 'You have to bee logged in to edit tasks!' unless logged_in?
    raise 'You have to be creator of the task to edit it!' if team.team_creator != @current_user

    if team.update_attributes(team_params)
      render json: {
        status: 200
      }
    else
      render json: {
        status: 500,
        errors: team.errors.full_messages
      }
    end
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e
    }
  end

  def destroy
    team = Team.find(params[:id])
    raise 'You are not allowd to access this site!' unless logged_in?
    raise 'You need to be task creator to preform this action' if @current_user != team.team_creator

    if team.destroy
      render json: {
        status: 200
      }
    end
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e
    }
  end

  private

  def team_params
    params.require(:data).permit(:name, :description)
  end
end
