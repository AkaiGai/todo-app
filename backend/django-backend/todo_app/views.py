from django.shortcuts import render, get_object_or_404
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_task(request):
  tasks = Task.objects.all()
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data, status=201)


@api_view(['POST'])
def add_task(request):
  serializer = TaskSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()
    return Response({'message':'Task added successfully.',
                     'data': serializer.data
                     }, status=201)

  return Response(serializer.errors, status=400)

@api_view(['PATCH'])
def update_task(request,pk):

  task = get_object_or_404(Task, pk=pk)
  serializer = TaskSerializer(task, data=request.data, partial=True)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)

  return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def remove_task(request,pk):
  task = get_object_or_404(Task, pk=pk)
  task.delete()
  return Response({'message':'Task removed successfully.'}, status=201)
