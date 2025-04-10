import logging
import json

from ckan.plugins import toolkit
from ckan.plugins.toolkit import abort, ObjectNotFound, ValidationError
from ckan import model
from ckan.common import _, g
from flask import Blueprint, request, Response, make_response
from ckanext.dataexplorer.lib import FileWriterService

log = logging.getLogger(__name__)

DUMP_FORMATS = "csv", "xlsx", "json", "xml"


class DataExplorer:
    def _get_ctx(self):
        return {
            "model": model,
            "session": model.Session,
            "user": g.user,
            "auth_user_obj": g.userobj,
            "for_view": True,
        }

    def _get_action(self, action, data_dict):
        return toolkit.get_action(action)(self._get_ctx(), data_dict)

    def extract(self):
        writer = FileWriterService()
        columns = []

        if request.method == "POST":
            # In Flask, request.form contains form data
            data_dict = dict(request.form)
            data = json.loads(data_dict["extract_data"])
            data["limit"] = int(
                toolkit.config.get("ckanext.dataexplorer.extract_rows_limit", 200000)
            )
            format = data.pop("format")
            log.info("data: {}".format(data))
            resource_meta = self._get_action("resource_show", {"id": data["ckan_resource_id"]})
            name = resource_meta.get("name", "extract").replace(" ", "_")

            filters = data.get("filters", {})
            if len(filters) > 0:
                name += "_filtered_data"

            try:
                resource_data = self._get_action("datastore_search", data)
                for key in data["fields"]:
                    columns.append(key)

                try:
                    columns.remove("_id")
                except ValueError:
                    pass
                try:
                    columns.remove("_full_count")
                except ValueError:
                    pass
                try:
                    columns.remove("rank")
                except ValueError:
                    pass

            except ObjectNotFound:
                abort(404, _("DataStore resource not found"))

            try:
                # Create a response object
                response = make_response()
                writer.write_to_file(columns, resource_data.get("records"), format, response, name)
                return response
            except ValidationError:
                abort(
                    400, _(u"Format: must be one of %s") % u", ".join(DUMP_FORMATS)
                )
        else:
            abort(400, _("Invalid request method"))

# Create a function to be used in the plugin
def dataexplorer_extract():
    return DataExplorer().extract
