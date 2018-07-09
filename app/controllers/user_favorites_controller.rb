class UserFavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]


  def create

    existing_artifact = Artifact.find_by(object_id: user_favorite_params[:object_id])
    if existing_artifact.nil?
      existing_artifact = Artifact.create(user_favorite_params)
    end

    UserFavorite.create(user_id: current_user.id, artifact_id: existing_artifact.id)
    render json: {message: 'success'}
  end

  def destroy

    artifact = Artifact.find_by(object_id: params[:id])
    user_favorite = UserFavorite.find_by(artifact_id: artifact.id, user_id: current_user.id) if artifact

    user_favorite.destroy if user_favorite
    render json: {message: 'deleted'}

  end


  def user_favorite_params
    params.require(:artifact).permit(:object_id, :name, :description, :image, :culture, :timePeriod)
  end
end
