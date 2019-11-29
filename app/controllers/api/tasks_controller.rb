class Api::TasksController < ApplicationController
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

  def index
    completed_tasks = Task.where(status: true)
    pending_tasks = Task.where(status: false)

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