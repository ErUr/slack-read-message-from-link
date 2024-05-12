import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const RemoveHttpPrefixDefinition = DefineFunction({
    callback_id: "remove_http_prefix",
    title: "Remove HTTP prefix",
    description: "Takes a link and removes the http:// / https:// prefix so we can use it in subsequent steps as a link - prevented by Slack link sanitization otherwise",
    source_file: "remove_http_prefix.ts",
    input_parameters: {
      properties: {
        link: {
          type: Schema.types.string,
          description: "Link",
        },
      },
      required: ["link"],
    },
    output_parameters: {
      properties: {
        stripped_link: {
          type: Schema.types.string,
          description: "Stripped link without http://",
        },
      },
      required: ["stripped_link"],
    },
  });
  
export default SlackFunction(
  RemoveHttpPrefixDefinition,
    async ({ inputs, client }) => {
      if (inputs.link.startsWith("https://")){
        return {outputs: {stripped_link: inputs.link.slice(8)}}
      }else if (inputs.link.startsWith("http://")) {
        return {outputs: {stripped_link: inputs.link.slice(7)}}
      }

      return {outputs: {stripped_link: inputs.link}}
    },
  );