require "rails_helper"

feature "Login to site" do
	scenario "the user signs up" do 
		visit '/'
		click_link('Sign In')
		#click_link('Sign up now!')
		click_link('Sign up now!')
		fill_in('Name', :with => 'Test')
		fill_in('Email', :with => 'Test@email.com')
		fill_in('Phone', :with => '+18326138479')
		fill_in('Password', :with => 'Password')
		click_button('Sign Up')
		expect(current_path).to eq "/locations"
	end
end