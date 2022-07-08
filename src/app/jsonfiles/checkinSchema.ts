export const schema = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "CallScriptTemplate",
  "description": "Defines a valid prompt object with a checkin workflow template",
  "type": "object",
  "required": [
    "greetingStep",
    "appointmentStep",
    "detailsStep",
    "actionsStep",
    "goodbyeStep"
  ],
  "properties": {
    "greetingStep": {
      "description": "A list of prompts which are to be played in the specified order",
      "type": "object",
      "minItems": 1,
      "required": [
        "prompts"
      ],
      "properties": {
        "prompts": {
          "description": "A list of prompts which are to be played in the specified order",
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/prompt"
          }
        }
      }
    },
    "appointmentStep": {
      "description": "A list of prompts which are to be played in the specified order",
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/prompt"
      }
    },
    "detailsStep": {
      "description": "A list of prompts which are to be played in the specified order",
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/prompt"
      }
    },
    "actionsStep": {
      "description": "A list of prompts which are to be played in the specified order",
      "type": "object",
      "required": [
        "actions",
        "prompts"
      ],
      "properties": {
        "actions": {
          "description": "A list of actions that are supported in the call",
          "type": "array",
          "items": {
            "$ref": "#/definitions/action"
          }
        },
        "prompts": {
          "description": "A list of prompts which are to be played in the specified order",
          "type": "array",
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/prompt"
          }
        }
      }
    },
    "goodbyeStep": {
      "description": "A list of prompts which are to be played in the specified order",
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/prompt"
      }
    }
  },
  "definitions": {
    "template": {
      "type":"object",
      "required": [
        "templateName",
        "templateFriendlyName",
      ],
      "properties" : {
        "templateName":{
          "type": "string",
          "description": "ID name for a template"
        },
        "templateFriendlyName": {
          "type": "string",
          "description": "human friendly name for a template"
        }
      }
    },
    "condition": {
      "type": "object",
      "required": [
        "conditionType",
        "value"
      ],
      "oneOf": [
        {
          "properties": {
            "conditionType": {
              "type": "string",
              "description": "The environmental variable within a call that we are putting under test",
              "enum": [
                "AMD"
              ]
            },
            "value": {
              "type": "boolean",
              "description": "The value of the conditionType variable"
            },
            "label":{
              "label": "booleanw",
            }
          }
        },
        {
          "properties": {
            "conditionType": {
              "type": "string",
              "description": "The environmental variable within a call that we are putting under test",
              "enum": [
                "ACTION_ENUM"
              ]
            },
            "value": {
              "type": "string",
              "description": "The value of the conditionType variable",
              "enum": [
                "CANCEL",
                "CONFIRM",
                "RESCHED",
                "NEGATIVE",
                "NEUTRAL",
                "POSITIVE",
                "TRANSFER",
                "OPTIN",
                "OPTOUT"
              ]
            },
            "label":{
              "label": "enumbig",
            }
          }
        }
      ]
    },
    "action": {
      "type": "object",
      "required": [
        "actionType",
        "actionEnum",
        "selectionType",
        "selectionValue"
      ],
      "properties": {
        "actionType": {
          "type": "string",
          "description": "provide description here",
          "enum": [
            "generic",
            "transfer"
          ]
        },
        "actionEnum": {
          "type": "string",
          "description": "provide description here",
          "enum": [
            "CONFIRM",
            "CANCEL",
            "RESCHED",
            "REPEAT",
            "TRANSFER",
            "NEGATIVE",
            "NEUTRAL",
            "POSITIVE"
          ]
        },
        "selectionType": {
          "type": "string",
          "description": "provide description here",
          "enum": [
            "digit"
          ]
        },
        "selectionValue": {
          "type": "string",
          "description": "provide description here",
          "pattern": "(^(\\*|1|2|3|4|5|6|7|8|9|0)$)"
        }
      }
    }
  }
}
