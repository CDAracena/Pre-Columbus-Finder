class UserFavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]


  def create

    existing_artifact = Artifact.find_by(object_id: user_favorite_params[:object_id])
    if existing_artifact.nil?
      existing_artifact = Artifact.create(user_favorite_params)
    end

    UserFavorite.create(user_id: current_user.id, artifact_id: existing_artifact.id)

    render :json, {message: 'success'}
  end

  def destroy


  end


  def user_favorite_params
    params.require(:artifact).permit(:object_id, :name, :description)
  end
end
