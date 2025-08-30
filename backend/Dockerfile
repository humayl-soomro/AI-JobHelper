# Use an official Python runtime as the base image
FROM python:3.11-slim-bookworm

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG False

ENV DJANGO_SETTINGS_MODULE=config.settings.production


# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for building Python packages and some AI libraries
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Install Spacy's English model
RUN python -m spacy download en_core_web_sm

# Copy the Django project code into the container
COPY . .

# Create the staticfiles directory first to avoid errors, then collectstatic
RUN echo "Skipping collectstatic" && mkdir -p staticfiles

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application using Gunicorn (production WSGI server)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]