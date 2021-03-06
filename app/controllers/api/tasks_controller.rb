# frozen_string_literal: true

class Api::TasksController < ApplicationController
  include CurrentUserConcern

  def create
    task = Task.new(task_params)
    task.creator = @current_user
    team = Team.find(params[:data][:team])
    task.team = team
    if task.save
      render json: {
        status: :created,
        task: task
      }
    else
      render json: {
        status: 500,
        errors: task.errors.full_messages
      }
    end
  end

  def assignment
    raise 'You are not allowd to access this site!' unless logged_in?

    task = Task.find(params[:data])
    user = @current_user

    if Manager.where(user_id: user.id, task_id: task.id).exists?
      raise 'This user has already been assigned to this task!'
    end

    user.assigned_tasks.each do |prev|
      if task.start_time.between?(prev.start_time, prev.end_time) ||
         task.end_time.between?(prev.start_time, prev.end_time)
        raise 'This time slot is already taken!'
      end
    end

    user.assigned_tasks << task
    render json: {
      status: 200,
      assignees: task.assignees,
      errors: ''
    }
  rescue StandardError => e
    render json: {
      status: 404,
      errors: e,
      assignees: task.assignees
    }
  end

  def unassigne
    raise 'You are not allowd to access this site!' unless logged_in?

    task = Task.find(params[:data])
    assignement = Manager.where('user_id = ? AND task_id = ?', @current_user.id, task.id).first

    if assignement.destroy
      render json: {
        status: 200,
        assignees: task.assignees,
        user: @current_user
      }
    end
  rescue StandardError => e
    render json: {
      status: 404,
      errors: e,
      assignees: task.assignees
    }
  end

  def timeline
    raise 'You are not allowd to access this site!' unless logged_in?

    tasks = @current_user.day_tasks(params[:data])
    render json: {
      status: 200,
      tasks: tasks
    }
  rescue StandardError => e
    render json: {
      status: 404,
      errors: e,
      tasks: []
    }
  end

  def update
    task = Task.find(params[:id])
    raise 'You have to bee logged in to edit tasks!' unless logged_in?
    raise 'You have to be creator of the task to edit it!' if task.creator_id != @current_user.id

    if task.update_attributes(task_params)
      render json: {
        status: 200,
        task: task
      }
    else
      render json: {
        status: 500,
        errors: task.errors.full_messages
      }
    end
  rescue StandardError => e
    render json: {
      status: 401,
      errors: e
    }
  end

  def show
    raise 'You are not allowd to access this site!' unless logged_in?

    task = Task.find(params[:id])
    team = task.team.name
    creator = task.creator || ''
    assignees = task.assignees
    user = @current_user
    render json: {
      status: 200,
      task: task,
      creator: creator,
      assignees: assignees,
      user: user,
      team: team
    }
  rescue StandardError => e
    render json: {
      status: 404,
      errors: e
    }
  end

  def index
    raise 'You are not allowd to access this site!' unless logged_in?

    completed_tasks = @current_user.teams.map do |team|
      team.tasks.where('end_time < ?', Time.now).order('start_time ASC').map do |task|
        completed_tasks = {
          id: task.id,
          title: task.title,
          description: task.description,
          start_time: task.start_time,
          end_time: task.end_time,
          team: task.team.name,
          creator: task.creator.name
        }
      end
    end
    pending_tasks = @current_user.teams.map do |team|
      team.tasks.where('end_time > ?', Time.now).order('start_time ASC').map do |task|
        pending_tasks = {
          id: task.id,
          title: task.title,
          description: task.description,
          start_time: task.start_time,
          end_time: task.end_time,
          team: task.team.name,
          creator: task.creator.name
        }
      end
    end

    render json: {
      status: 200,
      completedTasks: completed_tasks,
      pendingTasks: pending_tasks
    }
  rescue StandardError => e
    render json: {
      status: 404,
      errors: e,
      completedTasks: [],
      pendingTasks: []
    }
  end

  def destroy
    task = Task.find(params[:id])
    raise 'You are not allowd to access this site!' unless logged_in?
    raise 'You need to be task creator to preform this action' if @current_user != task.creator

    if task.destroy
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

  def count
    tasks = Task.all.count
    teams = Team.all.count

    render json: {
      status: 200,
      tasks: tasks,
      teams: teams
    }
  rescue StandardError => e
    render json: {
      status: 500,
      errors: e
    }
  end

  private

  def task_params
    params.require(:data).permit(:title, :description, :start_time, :end_time)
  end
end
