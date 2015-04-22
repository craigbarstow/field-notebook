class MapsController < ApplicationController
  def new
    @map = Map.new
  end

  def create
    binding.pry
    redirect_to(project_path(Project.find([params[:project_id]])))
  end
end
