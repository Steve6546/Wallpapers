import socketio

from azm_ai.server.app import app as base_app
from azm_ai.server.listen_socket import sio
from azm_ai.server.middleware import (
    AttachConversationMiddleware,
    CacheControlMiddleware,
    InMemoryRateLimiter,
    LocalhostCORSMiddleware,
    ProviderTokenMiddleware,
    RateLimitMiddleware,
)
from azm_ai.server.static import SPAStaticFiles

base_app.mount(
    '/', SPAStaticFiles(directory='./frontend/build', html=True), name='dist'
)

base_app.add_middleware(
    LocalhostCORSMiddleware,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

base_app.add_middleware(CacheControlMiddleware)
base_app.add_middleware(
    RateLimitMiddleware,
    rate_limiter=InMemoryRateLimiter(requests=10, seconds=1),
)
base_app.middleware('http')(AttachConversationMiddleware(base_app))
base_app.middleware('http')(ProviderTokenMiddleware(base_app))

app = socketio.ASGIApp(sio, other_asgi_app=base_app)
