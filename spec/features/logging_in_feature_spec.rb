require "rails_helper"

feature "Login to site" do
	scenario "the user signs up" do 
		visit '/'
		click_link('Sign In')
		click_link('Sign up now!')
		fill_in('Name', :with => 'Test')
		fill_in('Email', :with => 'Test@email.com')
		fill_in('Phone', :with => '+18326138479')
		fill_in('Password', :with => 'Password')
		click_button('Sign Up')
		expect(current_path).to eq "/locations"
	end
	#Issue with capybara logging back in after logout
	scenario "user logs in after signup" do
		visit '/'
		click_link('Sign In')
		click_link('Sign up now!')
		fill_in('Name', :with => 'Test')
		fill_in('Email', :with => 'Test@email.com')
		fill_in('Phone', :with => '+18326138479')
		fill_in('Password', :with => 'Password')
		click_button('Sign Up')
		click_link('Sign Out')
		click_link('Sign In')
		fill_in('Email', :with => 'Test@email.com')
		fill_in('Password', :with => 'Password')
		click_button('Sign In')
		expect(current_path).to eq "/locations"
	end
	#Issue with javascript not rendering rest of page
	scenario "user picks sets destination" do 
		visit '/'
		click_link('Sign In')
		click_link('Sign up now!')
		fill_in('Name', :with => 'Test')
		fill_in('Email', :with => 'Test@email.com')
		fill_in('Phone', :with => '+18326138479')
		fill_in('Password', :with => 'Password')
		click_button('Sign Up')
		choose( option: 0)
		within("#set_route") do 
			fill_in 'route_id', with: '1'
			binding.pry
			click_button 'Set Route'
		end
	end
end