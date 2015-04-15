class PhotosController < ApplicationController
  def create
    photo_info = get_photo_params
  end

  private

  def get_photo_params
    params.require(:photo).permit(:url, :caption)
  end
end
