require "rails_helper"

feature "Login to site" do
	scenario "the user visits homepage and clicks signin" do 
		visit '/'
		click_link('Sign In')
		#click_link('Sign up now!')
		find_button('Sign In').visible?
		binding.pry
	end
end