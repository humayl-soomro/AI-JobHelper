from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Job(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    job_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    notes = models.TextField(blank=True, null=True)
    date_applied = models.DateField(null=True, blank=True)
    tags = models.JSONField(default=list, blank=True)  # Simple tags storage

    def __str__(self):
        return f"{self.title} @ {self.company}"
