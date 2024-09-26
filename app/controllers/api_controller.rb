class ApiController < ApplicationController
  include ActionController::Live
  include StreamingHelper
  
  skip_before_action :verify_authenticity_token

  def send_messages
    # test_respond_with_stream
    test_respond_with_stream_of_code
    # OpenaiInteractionService.new.send_messages([{ role: "user", content: "Explain Music Theory" }])
  end
end 