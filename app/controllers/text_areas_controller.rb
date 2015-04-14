class TextAreasController < ApplicationController
  #FIXME add before action: validate?

  def create
    text_area = text_area_params
    @text_area = TextArea.create(
      project_id: text_area[:proj],
      content: text_area[:content]
    )
    if @text_area.save
      flash[:notice] = 'Text Area Added.'
      respond_to do |format|
        format.json { render :json => {success: true} }
      end
    else
      flash[:notice] = 'Failed to Save Text Area.'
      respond_to do |format|
        format.json { render :json => {success: false} }
      end
    end
  end

  private

  def  text_area_params
    params.permit(:content, :id, :proj)
  end
end
