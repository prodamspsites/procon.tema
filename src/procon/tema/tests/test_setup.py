# -*- coding: utf-8 -*-

from plone.app.theming.utils import getAvailableThemes
from plone.app.theming.utils import getTheme
from procon.tema.testing import INTEGRATION_TESTING
import unittest


class InstallTestCase(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']

    def test_temas_disponiveis(self):
        themes = getAvailableThemes()
        # Nosso tema + os dois do Plone
        self.assertEqual(len(themes), 3)

    def test_tema_capa_disponivel(self):
        theme = getTheme('capa')
        self.assertTrue(theme is not None)
        self.assertEqual(theme.__name__, 'capa')
        self.assertEqual(theme.title, 'Tema Capa')
        self.assertEqual(theme.description,
                         'Tema para site Capa')
        self.assertEqual(theme.rules, '/++theme++capa/rules.xml')
        self.assertEqual(theme.absolutePrefix, '/++theme++capa')
        self.assertEqual(theme.doctype, '<!DOCTYPE html>')
