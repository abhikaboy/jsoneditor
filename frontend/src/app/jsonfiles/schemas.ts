let schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$ref": "#/definitions/Welcome",
  "title": "Welcome",
  "description": "yoh",
  "properties": {
    "steps": {
      "type": "array",
      "$ref": "#/definitions/Welcome",
    }
  },
  "definitions": {
    "Welcome": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "steps": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Step"
          }
        }
      },
      "required": [
        "steps"
      ],
      "title": "Welcome"
    },
    "Step": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "stepId": {
          "type": "string"
        },
        "stepName": {
          "type": "string"
        },
        "modalType": {
          "type": "string"
        },
        "toInitiateFriendlyName": {
          "type": "string"
        },
        "completedFriendlyName": {
          "type": "string"
        },
        "actorId": {
          "type": "string"
        },
        "patientViewable": {
          "type": "boolean"
        },
        "onComplete": {
          "$ref": "#/definitions/OnComplete"
        },
        "patientViewbleAction": {
          "type": "string"
        },
        "setExpectedSeenMinutesFromNow": {
          "type": "integer"
        },
        "templates": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Template"
          }
        },
        "dataSources": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/DataSource"
          }
        },
        "stepData": {
          "$ref": "#/definitions/StepData"
        },
        "allowDelete": {
          "type": "boolean"
        },
        "allowManualCompletion": {
          "type": "boolean"
        },
        "buttonText": {
          "type": "string"
        }
      },
      "required": [
        "actorId",
        "completedFriendlyName",
        "modalType",
        "patientViewable",
        "stepId",
        "stepName",
        "toInitiateFriendlyName"
      ],
      "title": "Step"
    },
    "DataSource": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "sourceType": {
          "type": "string"
        },
        "sourceAddress": {
          "type": "string"
        },
        "target": {
          "type": "string"
        }
      },
      "required": [
        "sourceAddress",
        "sourceType",
        "target"
      ],
      "title": "DataSource"
    },
    "OnComplete": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "eventType": {
          "type": "string"
        },
        "parameters": {
          "$ref": "#/definitions/Parameters"
        }
      },
      "required": [
        "eventType",
        "parameters"
      ],
      "title": "OnComplete"
    },
    "Parameters": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "to": {
          "type": "string"
        },
        "templateName": {
          "type": "string"
        }
      },
      "required": [
        "templateName"
      ],
      "title": "Parameters"
    },
    "StepData": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "paymentIdentifier": {
          "type": "string"
        },
        "paymentIdentifierLabel": {
          "type": "string"
        },
        "copayAmountIdentifierLabel": {
          "type": "string"
        },
        "copayAmountIdentifier": {
          "type": "string"
        }
      },
      "required": [
        "copayAmountIdentifier",
        "copayAmountIdentifierLabel",
        "paymentIdentifier",
        "paymentIdentifierLabel"
      ],
      "title": "StepData"
    },
    "Template": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "templateName": {
          "type": "string"
        },
        "templateFriendlyName": {
          "type": "string"
        }
      },
      "required": [
        "templateFriendlyName",
        "templateName"
      ],
      "title": "Template"
    }
  }
}
let callScriptSchema = {
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
              "label": "schema label 0",
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
let tokenExtenderSchema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Welcome",
  "description": "yoh",
  "properties": {
    "welcome": {
      "type": "object",
      "$ref": "#/definitions/Welcome",
    },
  },
  "definitions": {
    "Welcome": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "required": {
          "type": "boolean"
        },
        "minification": {
          "type": "boolean"
        }
      },
      "required": [
        "minification",
        "required"
      ],
      "title": "Welcome"
    }
  }
}
let userSettingsSchema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$ref": "#/definitions/Welcome",
  "title": "Welcome",
  "description": "yoh",
  "properties": {
    "welcome": {
      "type": "object",
      "$ref": "#/definitions/Welcome",
    },
  },
  "definitions": {
    "Welcome": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Portal2Enabled": {
          "type": "boolean"
        }
      },
      "required": [
        "Portal2Enabled"
      ],
      "title": "Welcome"
    }
  }
}
let accountProductSchema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "welcome": {
      "type": "object",
      "$ref": "#/definitions/Welcome",
    },
  },
  "title": "schema",
  "description": "test",
  "definitions": {
    "Welcome": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "OnDemand": {
          "type": "boolean"
        },
        "2WayText": {
          "type": "boolean"
        },
        "Reschedule": {
          "type": "boolean"
        }
      },
      "required": [
        "2WayText",
        "OnDemand",
        "Reschedule"
      ],
      "title": "Welcome"
    }
  }
}
export function setSchema(newSchema) {
  schema = newSchema;
}
export { schema };
export const schemas = [
  { name: "Callscript", schema: { callScriptSchema } },
  { name: "ArrivedWorkflow", schema: { schema } },
  { name: "TokenExtender", schema: { tokenExtenderSchema } },
  { name: "userSettings", schema: { userSettingsSchema } },
  { name: "AccountProductSettings", schema: { accountProductSchema } },
]
