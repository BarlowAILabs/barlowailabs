from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        # List all the named URLs you want in the sitemap
        return ['index', 'about', 'price', 'contact', 'privacy', 'terms']

    def location(self, item):
        return reverse(item)
