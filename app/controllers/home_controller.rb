class HomeController < ApplicationController
  def index
    @user = current_user
    @artifact = Artifact.all
  end

end
