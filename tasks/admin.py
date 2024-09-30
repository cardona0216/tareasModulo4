from django.contrib import admin

from .models import Tasks, Cancha, Reserva

# Register your models here.

admin.site.register(Tasks)
admin.site.register(Cancha)
admin.site.register(Reserva)