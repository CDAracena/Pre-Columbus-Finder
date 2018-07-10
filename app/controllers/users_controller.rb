class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @users = User.all
    @user_favorites = UserFavorite.all
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)

    redirect_to users_path
  end

  def destroy
    User.destroy(params[:id])

    redirect_to users_path
  end

  private

  def user_params
    params.require(:user).permit(:f_name, :l_name, :email)
  end

end
