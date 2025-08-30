from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Job.objects.filter(user=self.request.user)
        status = self.request.query_params.get('status')
        tag = self.request.query_params.get('tag')
        if status:
            queryset = queryset.filter(status=status)
        if tag:
            queryset = queryset.filter(tags__contains=[tag])
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()