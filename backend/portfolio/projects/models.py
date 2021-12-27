import uuid
from django.db import models



class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    in_brief = models.TextField(default="short description",max_length=256) 
    description = models.TextField()
    url = models.URLField()
    source = models.URLField(blank=True)
    technology = models.CharField(max_length=20)
    image = models.ImageField(blank=True,upload_to='img')
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-updated_at']





