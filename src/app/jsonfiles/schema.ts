export const schema = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "CallScriptTemplate",
  "description": "Defines a valid prompt object with a Talksoft call template",
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
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/prompt"
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
    "prompt": {
      "type": "object",
      "required": [
        "promptType",
        "resource",
        "conditions"
      ],
      "oneOf": [
        {
          "properties": {
            "promptType": {
              "description": "Indicates which type of prompt this prompt is",
              "type": "string",
              "enum": [
                "playMulti",
                "sayDate",
                "sayTime",
                "sayName"
              ]
            },
            "resource": {
              "description": "A reference to a resource or a token. Please note: if the resource property contains a time, ensure that it is of the format HH:mm, h:mm, hh:mm or hh:mma. If resource is a date, ensure that it is of the format yyyy-MM-dd, MM-dd-yyyy",
              "type": "string",
              "pattern": "(^(:PROVIDER|:LOCATION|:APPT_TYPE|:CALLER_ID|:ADDRESS|:CALLBACK_NUM|:TRANSFER_NUM|:CUSTOM1|:CUSTOM2|:CUSTOM3|:RECIP_FNAME|:APPT_DATE_ONLY|:APPT_TIME_ONLY|:BROADCAST|:ARRIVAL_TIME)$|(^\\d+(,\\d+)*$))"
            },
            "label": {
              "label": "schema label 0"
            }
          }
        },
        {
          "properties": {
            "promptType": {
              "description": "A prompt type of sayGeneric is used to anunciate a series of numbers.  A prompt type of pause expects the resource to hold the number of ms to pause.",
              "type": "string",
              "enum": [
                "sayGeneric",
                "pause"
              ]
            },
            "resource": {
              "description": "A reference to a resource or a token",
              "type": "string",
              "pattern": "(^(:CALLER_ID|:CALLBACK_NUM|:TRANSFER_NUM)$|(^[0-9]+$))"
            },
            "label":{
              "label": "schema label 1",
            }
          }
        }
      ],
      "properties": {
        "conditions": {
          "description": "Conditions that must be met in order for then enclosing prompt to play",
          "type": "array",
          "items": {
            "$ref": "#/definitions/condition"
          }
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
              "label": "schema label 0",
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
              "label": "schema label 1",
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
