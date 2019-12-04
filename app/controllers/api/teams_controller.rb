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
        members = team.users.map {|user| user.name}
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
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg,
        temas: []
      }
    end
  end

  def join_team
    begin
      raise 'Please first loggin!' if !logged_in?
      team = Team.find(params[:id])

      @current_user.teams << team

      teams = Team.all.map do |team|
        creator = team.team_creator
        members = team.users.map {|user| user.name}
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
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg,
        temas: []
      }
    end
  end

  def leave_team
    begin
      raise 'Please first loggin!' if !logged_in?
      team = Team.find(params[:id])
      raise 'This team does not exists' if team.nil?
      teammanager = Teammanager.where("user_id = ? AND team_id = ?", @current_user.id, team.id).first
      raise 'You are not part of this team' if teammanager.nil?
      teammanager.destroy
      teams = Team.all.map do |team|
        creator = team.team_creator
        if team.users.size > 0
          members = team.users.map {|user| user.name}
        else
          members = []
        end
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