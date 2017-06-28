from django.contrib import admin

from ..models import Snippet


@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    exclude = ['highlighted']
    readonly_fields = ['created_by', 'created_at', 'modified_by', 'modified_at']
