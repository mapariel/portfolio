from rest_framework import generics

from portfolio.projects.models import Project
from portfolio.projects.serializers import ProjectSerializer

class ProjectsListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer