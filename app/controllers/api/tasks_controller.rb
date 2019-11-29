class Api::TasksController < ApplicationController
  include CurrentUserConcern  


  def create
    task = Task.new(task_params)

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

  def update
  end

  def show
    begin
      task = Task.find(params[:id])

      render json: {
        status: 200,
        task: task
      }
    rescue StandardError => msg 
      render json: {
        status: 404,
        errors: 'This task does not exists!'
      }
    end
  end

  def index
    completed_tasks = Task.where("end_time <= ?", Time.now).order('end_time DESC')
    pending_tasks = Task.where("end_time > ?", Time.now).order('start_time ASC')

    render json: {
      status: 200,
      completedTasks: completed_tasks,
      pendingTasks: pending_tasks
    }
    
  end

  def destory
  end

  private

  def task_params
    params.require(:task).permit(:title,:description,:start_time,:end_time)
  end
end