import os

from django.conf import settings

_default_app_settings = {
    'POSTS_DIR': os.path.join(settings.BASE_DIR, 'posts'),
    'POST_FRONTMATTER_LIST_DELIMITER': ',',
    'POST_PREVIEW_LENGTH': 400,
}

app_settings = _default_app_settings.copy()
app_settings.update(getattr(settings, 'APP', {}))
