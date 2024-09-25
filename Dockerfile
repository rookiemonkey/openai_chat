# Use an official Ruby image as the base
FROM ruby:2.7.4

RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install dependencies for the Rails app
RUN apt-get update -qq && apt-get install -y build-essential apt-utils libpq-dev nodejs yarn

# Set working directory
WORKDIR /docker/app

# Copy the Gemfile and Gemfile.lock to the container
COPY Gemfile* ./

# Install gems
RUN bundle install

RUN bundle exec rails assets:precompile

# Copy the rest of the app code to the working dir
ADD . /docker/app

# Set default port
ARG DEFAULT_PORT 3000

# Expose port 3000 to allow traffic
EXPOSE ${DEFAULT_PORT}

# Start the server
CMD ["rails","server"]