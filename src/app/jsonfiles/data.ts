export const data = {
    "greetingStep": {
        "prompts": [{
            "promptType": "playMulti",
            "resource": "159,112",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": ":LOCATION",
            "conditions": []
        }]
    },
    "appointmentStep": [{
            "promptType": "playMulti",
            "resource": "52",
            "conditions": []
        }, {
            "promptType": "sayName",
            "resource": ":RECIP_FNAME",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": "97",
            "conditions": []
        }, {
            "promptType": "sayDate",
            "resource": ":APPT_DATE_ONLY",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": "147",
            "conditions": []
        }, {
            "promptType": "sayTime",
            "resource": ":APPT_TIME_ONLY",
            "conditions": []
        }
    ],
    "detailsStep": [{
            "promptType": "playMulti",
            "resource": "138",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": ":PROVIDER",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": "147",
            "conditions": []
        }, {
            "promptType": "playMulti",
            "resource": ":ADDRESS",
            "conditions": []
        }
    ],
    "actionsStep": {
        "actions": [{
                "actionType": "generic",
                "actionEnum": "CONFIRM",
                "selectionType": "digit",
                "selectionValue": "1"
            }, {
                "actionType": "generic",
                "actionEnum": "CANCEL",
                "selectionType": "digit",
                "selectionValue": "2"
            }, {
                "actionType": "generic",
                "actionEnum": "REPEAT",
                "selectionType": "digit",
                "selectionValue": "*"
            }
        ],
        "prompts": [{
                "promptType": "playMulti",
                "resource": "46,91,42,39,4661,5037",
                "conditions": []
            }
        ]
    },
    "goodbyeStep": [{
            "promptType": "playMulti",
            "resource": "136",
            "conditions": [{
                    "conditionType": "AMD",
                    "value": true
                }
            ]
        }, {
            "promptType": "sayGeneric",
            "resource": ":CALLER_ID",
            "conditions": [{
                    "conditionType": "AMD",
                    "value": true
                }
            ]
        }, {
            "promptType": "playMulti",
            "resource": "44",
            "conditions": [{
                    "conditionType": "ACTION_ENUM",
                    "value": "CONFIRM"
                }
            ]
        }, {
            "promptType": "playMulti",
            "resource": "157",
            "conditions": [{
                    "conditionType": "ACTION_ENUM",
                    "value": "CANCEL"
                }
            ]
        }, {
            "promptType": "sayGeneric",
            "resource": ":CALLER_ID",
            "conditions": [{
                    "conditionType": "ACTION_ENUM",
                    "value": "CANCEL"
                }
            ]
        }, {
            "promptType": "playMulti",
            "resource": "156",
            "conditions": [{
                    "conditionType": "ACTION_ENUM",
                    "value": "CANCEL"
                }
            ]
        }
    ]
}
