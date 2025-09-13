# Use an official Python runtime as a base image
FROM python:3.11-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies required for building Python packages and Postgres client
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create and switch to a non-root user for security
RUN adduser --disabled-password --gecos '' myuser
USER myuser

# The command to run when the container starts (can be overridden by docker-compose)
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:10000"]