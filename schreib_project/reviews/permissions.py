from rest_framework import permissions


class IsAuthorOfReview(permissions.BasePermission):
    def has_object_permission(self, request, view, review):
        print(review.author)
        print(request.user)
        
        if request.user:
            return review.author == request.user
        return False
