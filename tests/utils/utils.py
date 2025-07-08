import http.client
import json
import logging
import os
import sys
from os import path
from string import Template

import yaml

log = logging.getLogger(__name__)


def load_file(file: str, context: dict) -> str:
    """
    Load file and apply the replacement of variable
    context must be a dictionnary that will have key value,
    the formatting will proceed by replacing the key by the value
    """
    namespace = sys._getframe(1).f_globals
    log.debug(f"context:{context}")
    with open(path.join(os.path.dirname(__file__), file), "r", encoding="utf-8") as file_io:
        content = file_io.read()
    template = Template(content)
    return template.safe_substitute(**context)


# def load_file(file, context={}):
#     """
#     Load file and apply the replacement of variable
#     context must be a dictionnary that will have key value,
#     the formatting will proceed by replacing the key by the value
#     """
#     namespace = sys._getframe(1).f_globals

#     with open(
#         path.join(os.path.dirname(namespace["__file__"]), file), "r", encoding="utf-8"
#     ) as file_io:
#         content = file_io.read()
#     template = Template(content)
#     return template.safe_substitute(**context)


def load_yaml_template(yaml_file, context={}):
    """
    Load the yaml file provided in parameter as a yaml object
    """
    content = load_file(yaml_file, context)
    return yaml.load(content, Loader=yaml.FullLoader)


def json_to_string(json: dict) -> str:
    """Dump the json to a string

    Args:
        json (dict): The Json to stringify

    Returns:
        str: the result of the json stringified
    """
    return json.dumps(yaml)


def load_json_template(json_file, context={}) -> dict:
    """Load a json file and interpolate variables from the context

    Args:
        json_file (str): the path to the json file
        context (dict, optional): The list of variables and their value. Defaults to {}.

    Returns:
        dict: JSON object with variables interpolated
    """
    content = load_file(json_file, context)
    return json.loads(content)


def configure_logging():
    # Enable debugging at http.client level
    http.client.HTTPConnection.debuglevel = 1
    # Initialize logging
    logging.basicConfig()
    logging.getLogger().setLevel(logging.DEBUG)
    # Configure requests logging
    requests_log = logging.getLogger("requests.packages.urllib3")
    requests_log.setLevel(logging.DEBUG)
    requests_log.propagate = True
