class ProjectsController < ApplicationController
  def index
    #FIXME this is terrible syntax and wont work for larger tables
    @projects = Project.all.where(user_id: current_user.id)
  end

  def create
    proj = project_params
    day = proj["date(3i)"]
    month = proj["date(2i)"]
    year = proj["date(1i)"]
    date = "#{day}-#{month}-#{year}".to_datetime

    @new_project = Project.create(
      user_id: current_user.id,
      title: proj[:title],
      date: date,
      location: proj[:location],
      coordinates: proj[:coordinates],
      description: proj[:description]
    )
    if @new_project.save
      flash[:notice] = 'Project Added.'
      redirect_to projects_path
    else
      flash[:notice] = @new_project.errors.full_messages
      render :new
    end
  end

  def new
    @project = Project.new() #FIXME, this doesnt pass the object properly to form
  end

  def show
    @project = Project.find(params[:id])
  end

  def destroy
    Project.delete(params[:id])
    redirect_to projects_path
  end

  protected
  def project_params
    params.require(:project).permit(:title, :date, :location, :coordinates,
      :description)
  end
end
