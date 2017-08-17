try:
    # CKAN 2.7 and later
    from ckan.common import config
except ImportError:
    # CKAN 2.6 and earlier
    from pylons import config

import logging
import json
import csv
import cStringIO

import ckan.logic as l

from email.utils import encode_rfc2231
from xlsxwriter.workbook import Workbook
from xml.etree.cElementTree import Element, SubElement, ElementTree
from ckan.common import _
from ckanext.dataexplorer.helpers import CustomJSONEncoder


DUMP_FORMATS = 'csv', 'json', 'xml', 'xlsx'

UTF8_BOM = u'\uFEFF'.encode(u'utf-8')

log = logging.getLogger(__name__)


class XMLWriter(object):
    def __init__(self, output, columns):

        self.delimiter = config.get('ckanext.dataexplorer.headers_names_delimiter', "_")
        self.output = output
        self.id_col = columns[0] == u'_id'
        if self.id_col:
            columns = columns[1:]
        columns_fixed = []
        for column in columns:
            columns_fixed.append(column.replace(" ", self.delimiter))
        self.columns = columns_fixed
        log.debug(self.columns)

    def writerow(self, row):
        root = Element(u'row')
        if self.id_col:
            root.attrib[u'_id'] = unicode(row[0])
            row = row[1:]
        for k, v in zip(self.columns, row):
            if v is None:
                SubElement(root, k).text = u'NULL'
                continue
            SubElement(root, k).text = unicode(v)
        ElementTree(root).write(self.output, encoding=u'utf-8')
        self.output.write(b'\n')


class JSONWriter(object):
    def __init__(self, output, columns):
        self.output = output
        self.columns = columns
        self.first = True

    def writerow(self, row):

        if self.first:
            self.first = False
            self.output.write(b'\n    ')
        else:
            self.output.write(b',\n    ')
        self.output.write(json.dumps(
            row,
            ensure_ascii=False,
            separators=(u',', u':'),
            sort_keys=True,
            cls=CustomJSONEncoder).encode('utf-8'))


class FileWriterService():
    def _csv_writer(self, columns, records, response):

        name = 'test'

        if hasattr(response, u'headers'):
            response.headers['Content-Type'] = b'text/csv; charset=utf-8'
            if name:
                response.headers['Content-disposition'] = (
                    b'attachment; filename="{name}.csv"'.format(
                        name=encode_rfc2231(name)))

        writer = csv.writer(response, delimiter=',')

        # Writing headers
        writer.writerow([c.encode("utf-8") for c in columns])

        # Writing records
        for record in records:
            writer.writerow([record[column] for column in columns])

    def _json_writer(self, columns, records, response):

        output = cStringIO.StringIO()
        name = 'test'

        if hasattr(response, u'headers'):
            response.headers['Content-Type'] = (
                b'application/json; charset=utf-8')
            if name:
                response.headers['Content-disposition'] = (
                    b'attachment; filename="{name}.json"'.format(
                        name=encode_rfc2231(name)))

        response.write(
            b'{\n  "fields": %s,\n  "records": [' % json.dumps(
                columns, ensure_ascii=False, separators=(u',', u':')).encode(u'utf-8'))

        # Initiate json writer and columns
        wr = JSONWriter(response, [c.encode("utf-8") for c in columns])

        # Write records
        for record in records:
            wr.writerow([record[column] for column in columns])

        response.write(b'\n]}\n')

    def _xml_writer(self, columns, records, response):

        name = 'test'

        if hasattr(response, u'headers'):
            response.headers['Content-Type'] = (
                b'text/xml; charset=utf-8')
            if name:
                response.headers['Content-disposition'] = (
                    b'attachment; filename="{name}.xml"'.format(
                        name=encode_rfc2231(name)))

        response.write(b'<data>\n')

        # Initiate xml writer and columns
        wr = XMLWriter(response, [c.encode("utf-8") for c in columns])

        # Write records
        for record in records:
            wr.writerow([record[column] for column in columns])

        response.write(b'</data>\n')

    def _xlsx_writer(self, columns, records, response):

        output = cStringIO.StringIO()
        name = 'test'

        if hasattr(response, u'headers'):
            response.headers['Content-Type'] = (
                b'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8')
            if name:
                response.headers['Content-disposition'] = (
                    b'attachment; filename="{name}.xlsx"'.format(
                        name=encode_rfc2231(name)))

        workbook = Workbook(output)
        worksheet = workbook.add_worksheet()

        # Writing headers
        col = 0
        for c in columns:
            worksheet.write(0, col, c)
            col += 1

        # Writing records
        row = 1
        for record in records:
            col = 0
            for column in columns:
                worksheet.write(row, col, record[column])
                col += 1
            row += 1

        workbook.close()
        response.write(output.getvalue())

    def write_to_file(self, columns, records, format, response):

        format = format.lower()
        if format == 'csv':
            return self._csv_writer(columns, records, response)
        if format == 'json':
            return self._json_writer(columns, records, response)
        if format == 'xml':
            return self._xml_writer(columns, records, response)
        if format == 'xlsx':
            return self._xlsx_writer(columns, records, response)
        raise l.ValidationError(_(
            u'format: must be one of %s') % u', '.join(DUMP_FORMATS))
