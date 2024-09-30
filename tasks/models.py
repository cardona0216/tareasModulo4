from django.contrib.auth.models import User
from django.db import models

#creaos la tabla para las tareas

class Tasks(models.Model):
    titulo = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    user = models.ForeignKey(User , on_delete=models.CASCADE , default=1)

    def __str__(self) :
        return self.titulo
    
class Cancha(models.Model):
    nombre = models.CharField(max_length=100)
    ubicacion = models.CharField(max_length=200)
    capacidad = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre
    

class Reserva(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    cancha = models.ForeignKey(Cancha, on_delete=models.CASCADE)
    fecha_reserva = models.DateField()
    hora_reserva = models.TimeField()

    class Meta:
        unique_together = ('cancha', 'fecha_reserva', 'hora_reserva')

    def __str__(self):
        return f'{self.cancha.nombre} reservada por {self.usuario.username} el {self.fecha_reserva} a las {self.hora_reserva}'
