"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 1.11.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os


def get_boolean_env(name, default):
    default = 'true' if default else 'false'
    return os.getenv(name, default).lower() in ['true', 'yes', '1']


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY',
                       '7!(l)r@v&y$7&06=fm&%t+r_*o%oq1c2s)^8q-^lo8w(kzl!_+')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_boolean_env('DJANGO_DEBUG', True)

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS').split(',') \
                if os.getenv('DJANGO_ALLOWED_HOSTS') else ['localhost', '127.0.0.1']

USE_X_FORWARDED_HOST = get_boolean_env('DJANGO_USE_X_FORWARDED_HOST', False)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('DJANGO_DATABASE_NAME', 'drf_boilerplate'),
        'USER': os.getenv('DJANGO_DATABASE_USER', 'drf_boilerplate'),
        'PASSWORD': os.getenv('DJANGO_DATABASE_PASSWORD', 'drf_boilerplate'),
        'HOST': os.getenv('DJANGO_DATABASE_HOST', '127.0.0.1'),
        'PORT': os.getenv('DJANGO_DATABASE_PORT', 5432),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'app.User'

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = os.getenv('DJANGO_TIMEZONE', 'UTC')

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.getenv('DJANGO_STATIC_ROOT',
                        os.path.join(BASE_DIR, 'collected_static'))

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.getenv('DJANGO_MEDIA_ROOT',
                       os.path.join(BASE_DIR, 'media'))

# Email
# https://docs.djangoproject.com/en/1.8/topics/email/#obtaining-an-instance-of-an-email-backend
EMAIL_BACKEND = os.getenv('DJANGO_EMAIL_BACKEND',
                          'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.getenv('DJANGO_EMAIL_HOST', '127.0.0.1')
EMAIL_PORT = int(os.getenv('DJANGO_EMAIL_PORT', '25'))
EMAIL_HOST_USER = os.getenv('DJANGO_EMAIL_HOST_USER', None)
EMAIL_HOST_PASSWORD = os.getenv('DJANGO_EMAIL_HOST_PASSWORD', None)
EMAIL_USE_TLS = get_boolean_env('DJANGO_EMAIL_USE_TLS', False)
EMAIL_USE_SSL = get_boolean_env('DJANGO_EMAIL_USE_SSL', False)
EMAIL_TIMEOUT = int(os.getenv('DJANGO_EMAIL_TIMEOUT', '60'))
EMAIL_SSL_KEYFILE = os.getenv('DJANGO_EMAIL_SSL_KEYFILE', None)
EMAIL_SSL_CERTFILE = os.getenv('DJANGO_EMAIL_SSL_CERTFILE', None)

# email from address used for emails sent to users
DEFAULT_FROM_EMAIL = os.getenv('DJANGO_DEFAULT_FROM_EMAIL', 'noreply@example.com')

# email from address used for error messages to admins/managers
SERVER_EMAIL = os.getenv('DJANGO_SERVER_EMAIL', 'root@localhost')

ADMINS = (
    ('django_cms_demo Admin', os.getenv('DJANGO_ADMIN_EMAIL', 'root@localhost')),
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s',
        },
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.getenv('DJANGO_LOG_FILE',
                                  os.path.join(BASE_DIR, 'debug.log')),
        },
        'email_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['email_admins'],
            'level': 'ERROR',
        },
        'django_cms_demo': {
            'handlers': ['console', 'file', 'email_admins'],
            'level': 'DEBUG' if DEBUG else 'INFO',
        },
    },
}
