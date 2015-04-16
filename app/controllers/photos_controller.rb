class PhotosController < ApplicationController
  def new
    @photo = Photo.new
  end

  def create
    photo_info = get_photo_params
    @photo = Photo.new
    #@photo.image = photo_info[:image]
    @photo.image = photo_info[:image]
    @photo.caption = photo_info[:caption]
    #FIXME validate that project belongs to current user
    @photo.project_id = params[:project_id]

    @photo.save

    #uploader.retrieve_from_store!('my_file.png')

    redirect_to project_path(Project.find(params[:project_id]))
  end

  def destroy
    #FIXME, make sure files are deleted from s3
    Photo.destroy(params[:id])
    redirect_to project_path(params[:project_id]);
  end

  private

  def get_photo_params
    params.require(:photo).permit(:image, :caption)
  end
end
