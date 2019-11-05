# Ckanext Dataexplorer


# Table of contents
  - [Getting started](#getting-started)
     - [Requirements](#requirements))
 - [Development](#development)
     - [Development Installation](#development-installation)
     - [Running the Tests](#running-the-tests)


# Getting started
This extension allows users to create a subset of a uploaded resource (CSV, XML, TSV) by using the filters from the Data Explorer.
Once a filter is applied users are able to download the filtered data from the Data Explorer.

### Requirements

This extension requires CKAN > 2.7.x version.

# Development

### Development installation

To install ckanext-dataexplorer for development, activate your CKAN virtualenv
and do:

```
git clone https://github.com/keitaroinc/ckanext-dataexplorer.git
cd ckanext-dataexplorer
python setup.py develop
pip install -r requirements.txt
```

All code MUST follow [PEP8 Style Guide](https://www.python.org/dev/peps/pep-0008/). Most editors have plugins or integrations and automatic checking for PEP8 compliance so make sure you use them.

You should add a pre-commit hook that will
check for PEP8 errors. Follow the next steps to enable this check.

1. Make sure you have installed the PEP8 style checker:
```
$ pip install pycodestyle
```
2. In the `.git/hooks` folder which is located inside the project's root
directory, create a file named `pre-commit` and inside put [this code](https://github.com/keitaroinc/pep8-git-hook/blob/master/pre-commit).
3. Make `pre-commit` executable by running this command:
```
$ chmod +x ckanext-dataexplorer/.git/hooks/pre-commit
```
Now, every time you commit code, the pre-commit hook will run and check for
PEP8 errors.

### Running the Tests

To run the tests, first make sure that you have installed the required
development dependencies in CKAN, which can be done by running the following
command in the CKAN's `src` directory:

```
pip install -r requirements.txt
```

After that just type this command to actually run the tests in the extension.

```
nosetests --ckan --with-pylons=test.ini
```
To run the tests and produce a coverage report, first make sure you have coverage installed in your virtualenv (pip install coverage) then run:

```
nosetests --nologcapture --with-pylons=test.ini --with-coverage --cover-package=ckanext.dataexplorer --cover-inclusive --cover-erase --cover-tests
```
