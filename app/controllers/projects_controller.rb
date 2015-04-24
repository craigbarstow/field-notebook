class ProjectsController < ApplicationController
  def index
    #FIXME, the custom paths break the index map
    if params[:search]
      @projects = Project.where(user_id: current_user.id).where(
      "to_tsvector(title) @@ plainto_tsquery(?)", [params[:search]]
      ).page(params[:page]).per(5)
      @search = true
    elsif params[:sort]
      #FIXME, these dont seem to work
      if params[:sort] == :title
        @projects = Project.where(user_id: current_user.id).order(:title).page(params[:page]).per(5)
      elsif params[:sort] == :newest
        @projects = Project.where(user_id: current_user.id).order(:created_at).page(params[:page]).per(5)
      elsif params[:sort] == :recently_modified
        @projects = Project.where(user_id: current_user.id).order(:updated_at).page(params[:page]).per(5)
      else
        #if sort param not in approved list, just return all projects
        @projects = Project.where(user_id: current_user.id).page(params[:page]).per(5)
      end
    else
      @projects = Project.where(user_id: current_user.id).page(params[:page]).per(5)
    end
  end

  def new
    @project = Project.new #FIXME, this doesnt pass the object properly to form
  end

  def create
    proj = project_params
    coordinates = proj[:coordinates]
    #FIXME, validate numbers
    if coordinates == "Retrieving Coordinates...." ||
      coordinates == "Geolocation is not supported." ||
      !coordinates.include?(",")
      coordinates = nil
    end
    @new_project = Project.create(
      user_id: current_user.id,
      title: proj[:title].titleize,
      date: DateCreator.create_datetime(proj["date(3i)"],
        proj["date(2i)"], proj["date(1i)"]),
      location: proj[:location].titleize,
      coordinates: coordinates,
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
    @project_contents = []
    #gather all text areas for project
    @text_areas = TextArea.where(project_id: @project.id)
    @text_areas.each do |text_area|
      @project_contents << {type: :text_area, content: text_area}
    end
    #gather all photos for project
    @photos = Photo.where(project_id: @project.id)
    @photos.each do |photo|
      @project_contents << {type: :photo, content: photo }
    end
    #gather all maps for project
    @maps = Map.where(project_id: @project.id)
    #pass map id, title, and caption, retrieve rest of info with ajax
    @maps.each do |map|
      @project_contents << {type: :map, content: map}
    end
    @project_contents = @project_contents.sort_by { |item| item[:content].created_at }
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    #FIXME validate coordinates in similar way as in create
    @project.update_attributes(project_params)
    if @project.save
      flash[:notice] = ["Project Successfully Updated"]
      redirect_to(project_path(@project))
    else
      flash[:notice] = @project.errors.full_messages
      render :edit
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
            title: project.title.titleize,
            date: DateCreator.stringify(project.date),
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
