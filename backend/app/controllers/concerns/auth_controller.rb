class AuthController < ApplicationController

    def issue_token(payload)
        JWT.encode(payload, Rails.application.secrets.secret_key_base, "HS256")
    end
    
    def create
        user = User.create(username: params[:username], password: params[:password])
        render json: user
        byebug
    end

    def login
        @curret_user = User.find_by(username: params[:username], password[:password])
        render json: @curret_user
    end
end