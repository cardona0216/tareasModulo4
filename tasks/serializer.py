
from rest_framework import serializers # este paquete nos permite seleccionar los campos
from django.contrib.auth.models import User
from .models import Tasks , Cancha , Reserva
from rest_framework.validators import ValidationError

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'
       

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)  # Confirmación de contraseña
    is_superuser = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'password2': {'write_only': True, 'required': False},
        }

    def validate(self, data):
        # Validación de contraseñas solo si ambos campos están presentes
        if 'password' in data and 'password2' in data:
            if data['password'] != data['password2']:
                raise serializers.ValidationError({'password2': 'Passwords must match.'})

        # Validación del email
        if 'email' in data:
            # Si self.instance está presente, excluye el usuario actual
            if self.instance:
                if User.objects.filter(email=data['email']).exclude(id=self.instance.id).exists():
                    raise serializers.ValidationError({'email': 'A user with this email already exists.'})
            else:
                # Para la creación de usuarios, verifica si el email ya existe
                if User.objects.filter(email=data['email']).exists():
                    raise serializers.ValidationError({'email': 'A user with this email already exists.'})

        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)
    

class CanchaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cancha
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
     usuario = serializers.StringRelatedField()
     cancha_detalle = serializers.SerializerMethodField()

     class Meta:
        model = Reserva
        fields = ['id', 'cancha', 'fecha_reserva', 'hora_reserva','usuario', 'cancha_detalle' ]

     def get_cancha_detalle(self, obj):
       return{
           'nombre':obj.cancha.nombre,
           'ubicacion': obj.cancha.ubicacion
       }
    
    