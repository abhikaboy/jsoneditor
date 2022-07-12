// import Ajv, {JSONSchemaType} from "ajv"
// const ajv = new Ajv()

// interface MyData {
//   foo: number
//   bar?: string
// }

// export const test: JSONSchemaType<MyData> = {
//   type: "object",
//   properties: {
//     foo: {type: "integer"},
//     bar: {type: "string", nullable: true}
//   },
//   required: ["foo"],
//   additionalProperties: false
// }

// const validate = ajv.compile(test)

// const data = {
//   foo: 1,
//   bar: "abc"
// }

// if (validate(data)) {
//   // data is MyData here
//   console.log(data.foo)
// } else {
//   console.log(validate.errors)
// }