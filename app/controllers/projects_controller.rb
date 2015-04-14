class ProjectsController < ApplicationController
  def index
    #FIXME this is terrible syntax and wont work for larger tables
    @projects = Project.all.where(user_id: current_user.id)
  end

  def new
    @project = Project.new #FIXME, this doesnt pass the object properly to form
  end

  def create
    proj = project_params

    @new_project = Project.create(
      user_id: current_user.id,
      title: proj[:title],
      date: DateCreator.create_datetime(proj["date(3i)"],
        proj["date(2i)"], proj["date(1i)"]),
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

  def show
    @project = Project.find(params[:id])
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    project = Project.find(params[:id])
    project.update_attributes(project_params)
    if project.save
      flash[:notice] = ["Project Successfully Updated"]
      redirect_to(projects_path(project))
    else
      flash[:notice] = @question.errors.full_messages
      redirect_to(projects_path(project))
    end
  end

  def destroy
    Project.delete(params[:id])
    redirect_to projects_path
  end

  #build map json and return it
  def map
    if params[:mapid] == 'index'
      map_data = []
      projects = Project.where(user_id: current_user.id)
      projects.each do |project|
        if project.coordinates
          project_hash = {
            path: project_path(project),
            title: project.title,
            date: project.date,
            coordinates: project.coordinates
          }
          map_data << project_hash
        end
      end
      respond_to do |format|
        format.json { render :json => map_data }
      end
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :date, :location, :coordinates,
      :description)
  end
end
