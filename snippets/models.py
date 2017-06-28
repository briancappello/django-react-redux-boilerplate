from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django_extensions.db.models import TimeStampedModel

LEXERS = [lexer for lexer in get_all_lexers() if lexer[1]]
LANGUAGE_CHOICES = [(lexer[1][0], lexer[0]) for lexer in LEXERS]
STYLE_CHOICES = sorted((style, style) for style in get_all_styles())


class Snippet(TimeStampedModel):
    title = models.CharField(max_length=100)
    code = models.TextField()
    line_nums = models.BooleanField(default=True)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=30)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=30)
