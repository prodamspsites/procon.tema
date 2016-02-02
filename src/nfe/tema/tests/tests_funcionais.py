# -*- coding: utf-8 -*-

from plone.app.theming.interfaces import IThemeSettings
from plone.app.theming.utils import applyTheme
from plone.app.theming.utils import getTheme
from plone.registry.interfaces import IRegistry
from plone.testing.z2 import Browser
from nfe.tema.testing import FUNCTIONAL_TESTING
from zope.component import getUtility
import Globals
import unittest


class TransformsTestCase(unittest.TestCase):

    layer = FUNCTIONAL_TESTING

    def setUp(self):
        Globals.DevelopmentMode = True
        self.portal = self.layer['portal']
        self.settings = getUtility(IRegistry).forInterface(IThemeSettings)
        import transaction
        transaction.commit()

    def test_tema_capa(self):
        theme = getTheme('capa')
        applyTheme(theme)
        self.settings.enabled = True
        import transaction
        transaction.commit()
        browser = Browser(self.layer['app'])
        browser.open(self.portal.absolute_url())

        # testar algum elemento do corpo da pagina
