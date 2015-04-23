class MapsController < ApplicationController
  def new
    @map = Map.new
  end

  def create
    # binding.pry
    #FIXME filter map_info through strong params
    map_info = params[:data]
    @map = Map.create(project_id: params[:project_id], title: map_info[:title],
      caption: map_info[:caption], center_lat: map_info[:center_lat],
      center_lng: map_info[:center_lng], zoom: map_info[:zoom])
    if @map.save
      #get id of new map
      map_id = @map.id
      #save all points
      map_info[:point_array].each do |key, value|
        @point = MapPoint.create(map_id: map_id, latitude: value[0],
          longitude: value[1])
        unless @point.save
          flash[:notice] = @point.errors.full_messages
          render js: "window.location = '#{new_project_map(Project.find([params[:project_id]]))}'"
        end
      end
      flash[:notice] = "Map Successfully Added"
      render js: "window.location = '#{project_path(Project.find([params[:project_id]]))}'"
    else
      flash[:notice] = @map.errors.full_messages
      render js: "window.location = '#{new_project_map(Project.find([params[:project_id]]))}'"
    end
  end

  def destroy
    Map.destroy(params[:id])
    MapPoint.destroy_all(map_id: params[:id])
    redirect_to project_path(Project.find([params[:project_id]]))
  end

  def return_content
    map_id = params[:id]
    #FIXME add exception handling in case map cant be found
    map = Map.find(map_id)
    map_points = MapPoint.where(map_id: map_id)
    points_array = []
    map_points.each do |point|
      points_array << {lat: point.latitude, lng: point.longitude}
    end
    map_data = {
      center_lat: map.center_lat,
      center_lng: map.center_lng,
      zoom: map.zoom,
      points: points_array
    }
    respond_to do |format|
      format.json { render :json => map_data }
    end
  end
end
