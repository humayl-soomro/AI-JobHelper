# jobs/models.py
from django.db import models
from django.conf import settings

def resume_upload_path(instance, filename):
    return f"resumes/{instance.user.id}/{filename}"

#Explanation:
# The resume_upload_path function is a helper function that generates a path for storing uploaded resumes.
# It takes two arguments: instance and filename.
# The instance argument is the Resume object that is being uploaded, and the filename argument is the name of the uploaded file.

class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resumes")
    name = models.CharField(max_length=255, blank=True, null=True)
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    parsed_text = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.file.name}"
   
# Explanation:
# The Resume model represents a resume uploaded by a user.
# It has a user field that references the user who uploaded the resume.
# The file field stores the uploaded resume file.
# The uploaded_at field stores the date and time when the resume was uploaded.
# The parsed_text field stores the extracted text from the resume.