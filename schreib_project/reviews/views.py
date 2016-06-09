from rest_framework import permissions, viewsets
from rest_framework.response import Response

from reviews.models import Review
from reviews.permissions import IsAuthorOfReview
from reviews.serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.order_by('-created_at')
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfReview(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(ReviewViewSet, self).perform_create(serializer)


class AccountReviewsViewSet(viewsets.ViewSet):
    queryset = Review.objects.select_related('author').all()
    serializer_class = ReviewSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class PostReviewsViewSet(viewsets.ViewSet):
    queryset = Review.objects.select_related('post').all()
    serializer_class = ReviewSerializer

    def list(self, request, post_id=None):
        queryset = self.queryset.filter(post__id=post_id)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
