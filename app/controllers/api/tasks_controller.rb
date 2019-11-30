class Api::TasksController < ApplicationController
  include CurrentUserConcern  


  def create
    task = Task.new(task_params)
    task.creator = @current_user

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

      user.assigned_tasks << task
      render json: {
        status: 200,
        assignees: task.assignees
      }
    rescue StandardError => msg 
      render json: {
        status: 404,
        errors: 'This task does not exists!'
      }
    end
  end

  def update
  end

  def show
    begin
      raise 'You are not allowd to access this site!' if !logged_in?
      task = Task.find(params[:id])
      creator = if task.creator then task.creator.attributes.slice('id', 'name') else '' end
      assignees = task.assignees
      render json: {
        status: 200,
        task: task,
        creator: creator,
        assignees: assignees
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
        errors: msg
      }
    end
  end

  def destory
  end

  private

  def task_params
    params.require(:task).permit(:title,:description,:start_time,:end_time)
  end
end