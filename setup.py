# -*- coding: utf-8 -*-

from setuptools import find_packages
from setuptools import setup

version = '0.5.0.dev'
long_description = (
    open('README.rst').read() + '\n' +
    open('CONTRIBUTORS.rst').read() + '\n' +
    open('CHANGES.rst').read()
)

setup(
    name='procon.tema',
    version=version,
    description="procon.tema",
    long_description=long_description,
    classifiers=[
        "Development Status :: 1 - Planning",
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 4.3",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
        "Operating System :: OS Independent",
        "Programming Language :: JavaScript",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Multimedia",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    keywords='plone temas diazo',
    author='Prodam',
    author_email='',
    url='https://github.com/prodamspsites/procon.tema',
    license='GPLv2.0',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    namespace_packages=['procon',],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Products.CMFPlone >=4.3',
        'setuptools',
        'plone.app.theming',
        'plone.app.themingplugins',
        'plone.app.contenttypes<1.1a1',
    ],
    extras_require={
        'test': [
            'plone.app.testing',
        ]
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    """,
)
