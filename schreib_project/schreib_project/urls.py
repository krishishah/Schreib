"""schreib_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url, patterns
from django.contrib import admin
from rest_framework_nested import routers
from authentication.views import AccountViewSet
from schreib_project.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)

urlpatterns = [

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
]
