# Use an official Ruby image as the base
FROM ruby:2.7.4

# Install dependencies for the Rails app
RUN apt-get update -qq && apt-get install -y build-essential apt-utils libpq-dev nodejs

# Set working directory
WORKDIR /docker/app

# Copy the Gemfile and Gemfile.lock to the container
COPY Gemfile* ./

# Install gems
RUN bundle install

# Copy the rest of the app code to the working dir
ADD . /docker/app

# Set default port
ARG DEFAULT_PORT 3000

# Expose port 3000 to allow traffic
EXPOSE ${DEFAULT_PORT}

# Start the server
CMD ["rails","server"]