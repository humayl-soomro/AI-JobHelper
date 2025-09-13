from rest_framework import viewsets, permissions, serializers, status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Resume
from .serializers import ResumeSerializer
from rest_framework.views import APIView

import pdfplumber
import docx
import os


from rest_framework.response import Response


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    SUPPORTED_EXTENSIONS = {'.pdf', '.docx'}

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user).order_by('-uploaded_at')

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)

        # Save the resume with the user and name from the request data
        name = self.request.data.get('name', '')  # get name from request data (adjust key if needed)
        resume = serializer.save(user=self.request.user, name=name)

        file_path = getattr(resume.file, 'path', None)
        if not file_path or not os.path.isfile(file_path):
            raise serializers.ValidationError("Uploaded file could not be found on the server.")

        ext = os.path.splitext(file_path)[1].lower()
        if ext not in self.SUPPORTED_EXTENSIONS:
            raise serializers.ValidationError(
                f"Unsupported file format '{ext}'. Please upload PDF or DOCX."
            )

        try:
            parsed_text = self._extract_text(file_path, ext)
        except Exception as e:
            raise serializers.ValidationError(f"Error reading file: {str(e)}")

        resume.parsed_text = parsed_text.strip()
        resume.save()

    def _extract_text(self, file_path, ext):
        if ext == '.pdf':
            return self._extract_from_pdf(file_path)
        elif ext == '.docx':
            return self._extract_from_docx(file_path)
        return ""

    def _extract_from_pdf(self, file_path):
        parsed_text = []
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                parsed_text.append(text)
        combined = "\n".join(parsed_text)
        if not combined.strip():
            combined = "[No selectable text found in PDF. It may be image-only.]"
        return combined

    def _extract_from_docx(self, file_path):
        doc = docx.Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])

#-------------------------------Analyze Resume-----------------------------
#-------------------------------Analyze Resume-----------------------------
#-------------------------------Analyze Resume-----------------------------
import requests
import json
from groq import Groq
from decouple import config

API_KEY = config('GROQ_API_KEY')
model = "meta-llama/llama-4-scout-17b-16e-instruct"
client = Groq(api_key=API_KEY)

def get_results_from_ai(resume_text, job_description):

    resume = resume_text
    job_desc = job_description

    prompt = f"""
    Compare the following resume and job description.
    1. List of matched skills.
    2. List of missing skills.
    Output in strict JSON.

    Resume:
    {resume}

    Job Description:
    {job_desc}

    Output should use these keys: 
    2. matched
    2. missing
    """
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.8,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None
    )

    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

def create_suggestions(result):
    # Create suggestions based on the result
    suggestions = []
    for skill in result['missing']:
        suggestion = f"Consider adding {skill} to your resume."
        suggestions.append(suggestion)
    # combine the result and suggestions
    return {**result, 'suggestions': suggestions}

def create_percent_match(result):
    # Create percent match based on the result
    total_skills = len(result['matched']) + len(result['missing'])
    percent_match = (len(result['matched']) / total_skills) * 100
    # round to 2 decimal places
    percent_match = round(percent_match, 2)
    # combine the result and percent match
    return {**result, 'match_score': percent_match}


class AnalyzeJobView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get('resume_id')
        resume_text = request.data.get('resume_text')
        job_description = request.data.get('job_description', '')


        if not job_description:
            return Response({"detail": "job_description is required"}, status=status.HTTP_400_BAD_REQUEST)


        if resume_id:
            try:
                resume = Resume.objects.get(pk=resume_id, user=request.user)
                resume_text = resume.parsed_text or ""
            except Resume.DoesNotExist:
                return Response({"detail": "resume not found"}, status=status.HTTP_404_NOT_FOUND)


        if not resume_text:
            return Response({"detail": "Provide resume_id or resume_text with some text."}, status=status.HTTP_400_BAD_REQUEST)


        result = get_results_from_ai(resume_text, job_description)
        # convert result to JSON
        result = json.loads(result)
        result = create_suggestions(result)
        result = create_percent_match(result)
        return Response(result, status=status.HTTP_200_OK)
