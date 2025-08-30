from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet, AnalyzeJobView

router = DefaultRouter()
router.register('resume', ResumeViewSet, basename='resume')

urlpatterns = [
    path('', include(router.urls)),
    path('analyze-resume/', AnalyzeJobView.as_view(), name='resume-analyze'),
]
