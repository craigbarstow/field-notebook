class ProjectsController < ApplicationController
  def index

  end

  def create
    proj = project_params
    @new_project = Project.create(
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
    @project = Project.new
  end

  def show

  end

  protected
  def project_params
    params.require(:project).permit(:title, :date, :location, :coordinates,
      :description)
  end
end

=begin
project"=>
  {"title"=>"this is a title",
   "date(1i)"=>"2015",
   "date(2i)"=>"3",
   "date(3i)"=>"27",
   "location"=>"near a river",
   "coordinates"=>"42.385894, -71.118368",
   "description"=>"this is a description"},

=end
