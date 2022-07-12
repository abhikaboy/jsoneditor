// export const data2 = {
//     "greetingStep": {
//         "prompts": [{
//             "promptType": "playMulti",
//             "resource": "159,112",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": ":LOCATION",
//             "conditions": []
//         }]
//     },
//     "appointmentStep": [{
//             "promptType": "playMulti",
//             "resource": "52",
//             "conditions": []
//         }, {
//             "promptType": "sayName",
//             "resource": ":RECIP_FNAME",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": "97",
//             "conditions": []
//         }, {
//             "promptType": "sayDate",
//             "resource": ":APPT_DATE_ONLY",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": "147",
//             "conditions": []
//         }, {
//             "promptType": "sayTime",
//             "resource": ":APPT_TIME_ONLY",
//             "conditions": []
//         }
//     ],
//     "detailsStep": [{
//             "promptType": "playMulti",
//             "resource": "138",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": ":PROVIDER",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": "147",
//             "conditions": []
//         }, {
//             "promptType": "playMulti",
//             "resource": ":ADDRESS",
//             "conditions": []
//         }
//     ],
//     "actionsStep": {
//         "actions": [{
//                 "actionType": "generic",
//                 "actionEnum": "CONFIRM",
//                 "selectionType": "digit",
//                 "selectionValue": "1"
//             }, {
//                 "actionType": "generic",
//                 "actionEnum": "CANCEL",
//                 "selectionType": "digit",
//                 "selectionValue": "2"
//             }, {
//                 "actionType": "generic",
//                 "actionEnum": "REPEAT",
//                 "selectionType": "digit",
//                 "selectionValue": "*"
//             }
//         ],
//         "prompts": [{
//                 "promptType": "playMulti",
//                 "resource": "46,91,42,39,4661,5037",
//                 "conditions": []
//             }
//         ]
//     },
//     "goodbyeStep": [{
//             "promptType": "playMulti",
//             "resource": "136",
//             "conditions": [{
//                     "conditionType": "AMD",
//                     "value": true
//                 }
//             ]
//         }, {
//             "promptType": "sayGeneric",
//             "resource": ":CALLER_ID",
//             "conditions": [{
//                     "conditionType": "AMD",
//                     "value": true
//                 }
//             ]
//         }, {
//             "promptType": "playMulti",
//             "resource": "44",
//             "conditions": [{
//                     "conditionType": "ACTION_ENUM",
//                     "value": "CONFIRM"
//                 }
//             ]
//         }, {
//             "promptType": "playMulti",
//             "resource": "157",
//             "conditions": [{
//                     "conditionType": "ACTION_ENUM",
//                     "value": "CANCEL"
//                 }
//             ]
//         }, {
//             "promptType": "sayGeneric",
//             "resource": ":CALLER_ID",
//             "conditions": [{
//                     "conditionType": "ACTION_ENUM",
//                     "value": "CANCEL"
//                 }
//             ]
//         }, {
//             "promptType": "playMulti",
//             "resource": "156",
//             "conditions": [{
//                     "conditionType": "ACTION_ENUM",
//                     "value": "CANCEL"
//                 }
//             ]
//         }
//     ]
// }
export const data = {"steps":[
  {
    "stepId": "arrived",
    "stepName": "Arrival Indicator",
    "modalType": "",
    "toInitiateFriendlyName": "",
    "completedFriendlyName": "Arrived",
    "actorId": "patient",
    "patientViewable": true
  },
  {
    "stepId": "checkinFormComplete",
    "stepName": "Checkin Form Completion Indicator",
    "modalType": "checkinForm",
    "toInitiateFriendlyName": "",
    "completedFriendlyName": "Checkin Form Completed",
    "actorId": "patient",
    "patientViewable": true,
    "onComplete": {
      "eventType": "sms",
      "parameters": {
        "to": ":CHECKIN_MOBILE_NUM",
        "templateName": "700720-checkinAutoResponse"
      }
    }
  },
  {
    "stepId": "intakeForm",
    "stepName": "Forms",
    "modalType": "intakeFormsStatus",
    "patientViewbleAction": "URL",
    "toInitiateFriendlyName": "Update Information",
    "completedFriendlyName": "Forms completed",
    "actorId": "patient",
    "patientViewable": true
  },
  {
    "stepId": "paymentRequestSent",
    "stepName": "Payment Request Sent Indicator",
    "modalType": "paymentRequestForm",
    "toInitiateFriendlyName": "Send Payment Request",
    "completedFriendlyName": "Payment Request Sent",
    "actorId": "agent",
    "setExpectedSeenMinutesFromNow": 0,
    "templates": [
      {
        "templateName": "700720-paymentRequestSent",
        "templateFriendlyName": "Payment Request Sent Template"
      }
    ],
    "onComplete": {
      "eventType": "webhook",
      "parameters": {
        "templateName": "700720-webhookRequestBody"
      }
    },
    "patientViewable": true,
    "dataSources": [
      {
        "sourceType": "JSON",
        "sourceAddress": "visitNumber",
        "target": ":PAYMENT_IDENTIFIER"
      },
      {
        "sourceType": "JSON",
        "sourceAddress": "copayAmount",
        "target": ":COPAY_AMOUNT"
      }

    ],
    "stepData": {
      "paymentIdentifier": ":PAYMENT_IDENTIFIER",
      "paymentIdentifierLabel": "Visit Number",
      "copayAmountIdentifierLabel": "Co-pay Amount",
      "copayAmountIdentifier": ":COPAY_AMOUNT"
    }
  },
  {
    "stepId": "paymentReceived",
    "stepName": "Payment Receipt Indicator",
    "modalType": "",
    "toInitiateFriendlyName": "",
    "completedFriendlyName": "Payment Received",
    "actorId": "patient",
    "patientViewable": true,
    "allowDelete": true,
    "allowManualCompletion": true
  },
  {
    "stepId": "checkingInsurance",
    "stepName": "Check Insurance Indicator",
    "modalType": "noop",
    "toInitiateFriendlyName": "Check Insurance",
    "completedFriendlyName": "Insurance checked",
    "actorId": "agent",
    "patientViewable": true,
    "allowDelete": true
  },
  {
    "stepId": "doctorRunningLate",
    "stepName": "Doctor Running late Indicator",
    "modalType": "onDemandForm",
    "buttonText": "Send Dr. Running late",
    "toInitiateFriendlyName": "Doctor Running Late",
    "completedFriendlyName": "Doctor Running Late",
    "actorId": "agent",
    "templates": [
      {
        "templateName": "700720-covidTestReady",
        "templateFriendlyName": "Doctor test template"
      },
      {
        "templateName": "700720-doctorReadySent",
        "templateFriendlyName": "Indoor visit template"
      }
    ],
    "patientViewable": true
  },
  {
    "stepId": "doctorReadySent",
    "stepName": "Doctor Ready Message Sent Indicator",
    "modalType": "onDemandForm",
    "buttonText": "Send Provider Ready Sms",
    "toInitiateFriendlyName": "Doctor Ready",
    "completedFriendlyName": "Dr Ready Sent",
    "actorId": "agent",
    "setExpectedSeenMinutesFromNow": 0,
    "templates": [
      {
        "templateName": "700720-covidTestReady",
        "templateFriendlyName": "Covid test template"
      },
      {
        "templateName": "700720-doctorReadySent",
        "templateFriendlyName": "Indoor visit template"
      }
    ],
    "patientViewable": true
  }
]}