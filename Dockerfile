# Use an official Ruby image as the base
FROM ruby:2.7.4

# Install dependencies for the Rails app
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential apt-utils libpq-dev nodejs yarn

# Set working directory
WORKDIR /docker/app

# Copy the Gemfile and Package to the container
COPY Gemfile* ./
COPY package* ./
COPY bin ./

# Copy the rest of the app code to the working dir
ADD . /docker/app

# Install rails deps
RUN bundle install

# Remove node_modules to avoid incop issues then install js deps
RUN rm -rf node_modules
RUN yarn

# Remove node_modules compiled assets locall then precompile assets again 
RUN rm -rf public/packs/
RUN bundle exec rails assets:precompile

# Set default port
ARG DEFAULT_PORT 3000

# Expose port 3000 to allow traffic
EXPOSE ${DEFAULT_PORT}

# Start the server
CMD ["rails","server"]