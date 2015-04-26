class PhotosController < ApplicationController
  def new
    @project = Project.find(params[:project_id])
    @photo = Photo.new
  end

  def create
    photo_info = get_photo_params
    # @photo = Photo.new
    if photo_info[:image]
      @photo = Photo.create(project_id: params[:project_id],
        image: photo_info[:image], caption: photo_info[:caption],
        title: photo_info[:title])
      if @photo.save
        flash[:notice] = ["Photo Added"]
        redirect_to(project_path(Project.find([params[:project_id]])))
      else
        flash[:notice] = @question.errors.full_messages
        redirect_to(project_path(Project.find([params[:project_id]])))
      end
    else
      flash[:notice] = ["Error: No Photo Selected"]
      redirect_to(project_path(Project.find([params[:project_id]])))
    end
  end

  def edit
    @project = Project.find(params[:project_id])
    @photo = Photo.find(params[:id])
  end

  def update
    photo = Photo.find(params[:id])
    photo.update_attributes(get_photo_params)
    if photo.save
      flash[:notice] = ["Project Successfully Updated"]
      redirect_to(project_path(Project.find([params[:project_id]])))
    else
      flash[:notice] = @question.errors.full_messages
      redirect_to(project_path(project.find([params[:project_id]])))
    end
  end

  def destroy
    #FIXME, make sure files are deleted from s3
    Photo.destroy(params[:id])
    redirect_to project_path(params[:project_id]);
  end

  private

  def get_photo_params
    params.require(:photo).permit(:title, :image, :caption)
  end
end
