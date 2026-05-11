from django.urls import path
from .views import get_task, add_task, update_task, remove_task

urlpatterns = [
  path('get-task/', get_task),
  path('add-task/', add_task),
  path('update-task/<int:pk>/', update_task),
  path('remove-task/<int:pk>/', remove_task),
]