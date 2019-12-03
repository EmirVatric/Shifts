class Api::TasksController < ApplicationController
  include CurrentUserConcern  


  def create
    task = Task.new(task_params)
    task.creator = @current_user
    team = Team.find(params[:task][:team])
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
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      task = Task.find(params[:id])
      user = @current_user

      raise 'This user has already been assigned to this task!' if Manager.where(user_id: user.id, task_id: task.id).exists?

      user.assigned_tasks.each do |prev|
        if task.start_time.between?(prev.start_time, prev.end_time) || task.end_time.between?(prev.start_time, prev.end_time)
          raise 'This time slot is already taken!'
        end
      end

      user.assigned_tasks << task
      render json: {
        status: 200,
        assignees: task.assignees,
        errors: ''
      }
    rescue StandardError => msg 
      render json: {
        status: 404,
        errors: msg,
        assignees: task.assignees
      }
    end
  end

  def unassigne
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      task = Task.find(params[:id])
      assignement = Manager.where("user_id = ? AND task_id = ?", @current_user.id, task.id).first
      
      if assignement.destroy
        render json: {
          status: 200,
          assignees: task.assignees,
          user: @current_user
        }
      end
    rescue StandardError => msg
      render json: {
        status: 404,
        errors: msg,
        assignees: task.assignees
      }
    end
  end

  def timeline
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      tasks = @current_user.day_tasks(params[:date])
      render json: {
        status: 200,
        tasks: tasks
      }
    rescue StandardError => msg
      render json: {
        status: 404,
        errors: msg,
        tasks: []
      }
    end
  end

  def update
    begin
      task = Task.find(params[:id])
      raise 'You have to bee logged in to edit tasks!' if !logged_in?
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
    rescue StandardError => msg
      render json: {
        status: 401,
        errors: msg
      }
    end
  end

  def show
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      task = Task.find(params[:id])
      creator = if task.creator then task.creator else '' end
      assignees = task.assignees
      user = @current_user
      render json: {
        status: 200,
        task: task,
        creator: creator,
        assignees: assignees,
        user: user
      }
    rescue StandardError => msg 
      render json: {
        status: 404,
        errors: 'This task does not exists!'
      }
    end
  end

  def index
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      completed_tasks = Task.where("end_time <= ?", Time.now).order('end_time DESC')
      pending_tasks = Task.where("end_time > ?", Time.now).order('start_time ASC')

      render json: {
        status: 200,
        completedTasks: completed_tasks,
        pendingTasks: pending_tasks
      }
    rescue StandardError => msg 
      render json: {
        status: 404,
        errors: msg,
        completedTasks: [],
        pendingTasks: []
      }
    end
  end

  def destroy
    begin
      task = Task.find(params[:id])
      raise 'You are not allowd to access this site!' if !logged_in?
      raise 'You need to be task creator to preform this action' if @current_user != task.creator

      if task.destroy
        render json: {
          status: 200
        }
      end
    rescue StandardError => msg
      render json: {
        status: 500,
        errors: msg
      }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title,:description,:start_time,:end_time)
  end
end