from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    #Handles generic model information
    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'bio', 'dob', 'password',
                  'confirm_password', 'likes_action','likes_adventure',
                  'likes_crime', 'likes_fan_fiction',
                  'likes_fantasy', 'likes_horror', 'likes_romance')

        read_only_fields = ('created_at', 'updated_at',)

    #Create an Account Object
    def create(self, validated_data):
        return Account.objects.create(**validated_data)

    #Modify an Account
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        #instance.bio = validated_data.get('bio', instance.bio)
        instance.likes_action = validated_data.get('likes_action', instance.likes_action)
        instance.likes_adventure = validated_data.get('likes_adventure', instance.likes_adventure)
        instance.likes_crime = validated_data.get('likes_crime', instance.likes_crime)
        instance.likes_fan_fiction = validated_data.get('likes_fan_fiction', instance.likes_fan_fiction)
        instance.likes_fantasy = validated_data.get('likes_fantasy', instance.likes_fantasy)
        instance.likes_horror = validated_data.get('likes_horror', instance.likes_horror)
        instance.likes_romance = validated_data.get('likes_romance', instance.likes_romance)


        instance.save()

        #Password defaults to none if empty password is provided
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        #make sure password isn't empty and passowrd matches old password
        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

            #Renews session with new password
            #Prevents user from having to login again after password reset
            update_session_auth_hash(self.context.get('request'), instance)

        return instance
