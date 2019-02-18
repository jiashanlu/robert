# Pull base image
FROM python:3.7-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code/robert_back_end/

# Install dependencies
RUN pip install pipenv
COPY ./Pipfile /code/Pipfile
RUN pipenv install --system --skip-lock

# Copy project
COPY . /code/robert_back_end/

# expose the port 8000
EXPOSE 8000

# define the default command to run when starting the container
# CMD ["gunicorn", "--chdir", "robert", "--bind", ":8000", "robert.wsgi:application"]
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]
