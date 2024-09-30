from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializer import TaskSerializer, CanchaSerializer, ReservaSerializer
from .models import Tasks , Cancha , Reserva
from rest_framework import serializers

from rest_framework.permissions import AllowAny
from django.db import IntegrityError
from django.core.exceptions import PermissionDenied

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra las tareas solo del usuario autenticado
        return Tasks.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Asigna el usuario autenticado a la tarea al momento de crearla
        serializer.save(user=self.request.user)

class CanchaViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Cancha.objects.all()
    serializer_class  = CanchaSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reserva.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    # def perform_create(self, serializer):
    #     if not self.request.user.is_authenticated:
    #         raise PermissionDenied("User is not authenticated")
    #     try:
    #         serializer.save(usuario=self.request.user)
    #     except IntegrityError:
    #         raise serializers.ValidationError("La reserva ya existe para esta cancha en esta fecha y hora.")
