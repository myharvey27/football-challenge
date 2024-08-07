
from django.contrib import admin
from django.urls import path, include
from offers.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("offers/user/register/", CreateUserView.as_view(), name="register"),
    path("offers/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("offers/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("offers-auth/", include("rest_framework.urls")),
    path("offers/", include("offers.urls")),
]
