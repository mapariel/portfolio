from rest_framework import serializers

from portfolio.projects.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "title","slug","in_brief","description","url","source","technology","image"]
        model = Project
