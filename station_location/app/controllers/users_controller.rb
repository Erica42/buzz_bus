class UsersController < ApplicationController
  include SessionsHelper
  def show
    @user = User.find(params[:id])
  end

  def new 
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      current_user
      redirect_to locations_path
    else
      @errors = @user.errors.full_messages
      render  'new'
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :phone)
  end
end
