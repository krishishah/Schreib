from rest_framework import serializers

from authentication.serializers import AccountSerializer
from posts.serializers import PostSerializer
from reviews.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    story = PostSerializer(read_only=True, required=False)

    class Meta:
        model = Review

        fields = ('id', 'author', 'story', 'content_edit', 'language_well', 'language_improve',
        'character_well', 'character_improve', 'setting_well',
        'setting_improve', 'structure_well', 'structure_improve',
        'theme_well', 'theme_improve', 'overall_comment',
        'overall_rating', 'created_at', 'updated_at')

        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ReviewSerializer, self).get_validation_exclusions()

        return exclusions + ['story','author']
