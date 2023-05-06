from django.contrib import admin
from portfolio.projects.models import Project
import arrow


class ProjectsAdmin(admin.ModelAdmin):
    model = Project

    list_display = (
        "title",
        "technology",
        "created",
        "updated",
        "url",
    )
    prepopulated_fields = {"slug": ("title",)}

    def created(self, obj):
        return arrow.get(obj.created_at).humanize()
    def updated(self, obj):
        return arrow.get(obj.updated_at).humanize()    


admin.site.register(Project, ProjectsAdmin)
