from django.urls import path
from . import views

urlpatterns = [
    path("offers/", views.OfferListCreate.as_view(), name="offers-list"),
    path("offers/delete/<int:pk>/", views.OfferDelete.as_view(), name="offers-delete")
]