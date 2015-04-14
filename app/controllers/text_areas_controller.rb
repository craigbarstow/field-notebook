class TextAreasController < ApplicationController
  #FIXME add before action: validate?

  def create
    text_area = text_area_params
    #defend against saving blank text areas
    unless text_area[:content] == "<div><br></div>"
      @text_area = TextArea.create(
        project_id: text_area[:proj],
        content: text_area[:content]
      )
      if @text_area.save
        message = 'Text Area Added.'
        respond_to do |format|
          #pass success json back, to allow the editor to close
          format.json { render :json => {success: true, id: @text_area.id, message: message} }
        end
      else
        message = 'Failed to Save Text Area.'
        respond_to do |format|
          #pass failure json back, keeping the editor open and allowing user to
          #correct mistakes
          format.json { render :json => {success: false, id: @text_area.id, message: message} }
        end
      end
    else
      message = 'Text Blank, Area Not Saved.'
      respond_to do |format|
        #pass success json back, to allow the editor to close
        format.json { render :json => {success: true, id: @text_area.id, message: message} }
      end
    end
  end

  def update
    text_area_info = text_area_params
    @text_area = TextArea.find(text_area_info[:id])
    if @text_area.update(content: text_area_info[:content])
      message = "Text Area Successfully Updated"
      respond_to do |format|
        #pass success json back, to allow the editor to close
        format.json { render :json => {success: true, id: @text_area.id, message: message} }
      end
    else
      message = 'Failed to Update Text Area.'
      respond_to do |format|
        #pass failure json back, keeping the editor open and allowing user to
        #correct mistakes
        format.json { render :json => {success: false, id: @text_area.id, message: message} }
      end
    end
  end

  private

  def text_area_params
    params.permit(:content, :id, :proj)
  end
end
