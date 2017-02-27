class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "Successfully Logged in"
      redirect_to locations_path
    else
      flash.now[:warning] = "Invalid email or password"
      render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:info] = "Logged out!"
    redirect_to locations_path
  end
end
