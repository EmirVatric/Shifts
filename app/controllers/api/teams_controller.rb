class Api::TeamsController < ApplicationController
  include CurrentUserConcern 

  def userteams
    begin 
      raise 'You are not allowd to access this site!' if !logged_in?
      teams = @current_user.teams

      render json: {
        status: 200,
        teams: teams
      }
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg,
        teams: []
      }
    end
  end


  def create
    begin 
      raise 'You are not allowd to access this site!' if !logged_in?
      team = Team.new(team_params)
      team.team_creator= @current_user

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
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg
      }
    end
  end

  def index
    begin
      
      teams = Team.all.map do |team|
        creator = team.team_creator
        teams = {
          id: team.id,
          name: team.name,
          description: team.description,
          creator: creator.name
        }
      end

      render json: {
        status: 200,
        teams: teams
      }
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg,
        temas: []
      }
    end
  end


  private 
  def team_params
    params.require(:team).permit(:name,:description)
  end
end