from django.conf import settings
from django.db import models

from django_extensions.db.models import TimeStampedModel

from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles

LEXERS = [lexer for lexer in get_all_lexers() if lexer[1]]
LANGUAGE_CHOICES = [(lexer[1][0], lexer[0]) for lexer in LEXERS]
STYLE_CHOICES = sorted((style, style) for style in get_all_styles())


class Snippet(TimeStampedModel):
    title = models.CharField(max_length=100)
    code = models.TextField()
    highlighted = models.TextField()
    line_nums = models.BooleanField(default=True)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=30)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=30)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='snippets')

    def save(self, **kwargs):
        lexer = get_lexer_by_name(self.language)
        formatter = HtmlFormatter(style=self.style,
                                  linenos='table' if self.line_nums else False,
                                  full=True,
                                  title=self.title)
        self.highlighted = highlight(self.code, lexer, formatter)
        super(Snippet, self).save(**kwargs)
