from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):

    #Overriding this from BasePermission class
    def has_object_permission(self, request, view, account):
        #If request request has an authenticated user
        if request.user:
            #We want to make sure that the user making the request
            #Is the same object as account
            return account == request.user
        return False
