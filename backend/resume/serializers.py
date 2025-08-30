from rest_framework import serializers
from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'name', 'file', 'uploaded_at', 'parsed_text']
        read_only_fields = ['id', 'name', 'uploaded_at', 'parsed_text']

# Explanation:
# The ResumeSerializer is a Django REST framework serializer that represents a resume.
# It includes the fields 'id', 'file', 'uploaded_at', and 'parsed_text'.
# The read_only_fields attribute specifies that only the 'id', 'uploaded_at', and 'parsed_text' fields should be editable.

# Usage:
# resume = Resume.objects.get(id=1)
# serializer = ResumeSerializer(resume)
# print(serializer.data)

# Output:
# {'id': 1, 'file': 'resume.pdf', 'uploaded_at': '2022-01-01T00:00:00Z', 'parsed_text': 'Resume text'}