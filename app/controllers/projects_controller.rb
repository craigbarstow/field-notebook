class ProjectsController < ApplicationController
  def index
    #FIXME this is terrible syntax and wont work for larger tables
    @projects = Project.all.where(user_id: current_user.id)
  end

  def create
    proj = project_params
    @new_project = Project.create(
      user_id: current_user.id,
      title: proj[:title],
      date: "#{proj["date(2i)"]}-#{proj["date(3i)"]}-#{proj["date(1i)"]}",
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

  protected
  def project_params
    params.require(:project).permit(:title, :date, :location, :coordinates,
      :description)
  end
end
