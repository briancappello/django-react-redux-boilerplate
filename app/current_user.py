from threading import local

_thread_local = local()


class CurrentUserMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        _thread_local.user = getattr(request, 'user', None)
        return self.get_response(request)


def get_current_user():
    return getattr(_thread_local, 'user', None)
