
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ReadMessageFromLinkDefinition } from "../../read_message_from_link.ts";

const MinWorkflow = DefineWorkflow({
  callback_id: "min_wf",
  title: "min",
  description: "min",
  input_parameters: {
    properties: {
      reacting_user_id: {
        type: Schema.slack.types.user_id,
      },
      message_context: {
        type: Schema.slack.types.message_context,
      },
      parent_link: {
        type: Schema.types.string
      }
    },
    required: ["reacting_user_id", "message_context"],
  }
});
MinWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C06NUFGKHRA",
  message: `LINK: ${MinWorkflow.inputs.parent_link}`,
});

const messageContent = MinWorkflow.addStep(ReadMessageFromLinkDefinition, {
  messageLink: MinWorkflow.inputs.parent_link,
  disableInThreads: false,
})

MinWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C06NUFGKHRA",
  message: messageContent.outputs.messageContent,
});

export {MinWorkflow}
