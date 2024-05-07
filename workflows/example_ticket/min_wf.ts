
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
    },
    required: ["reacting_user_id", "message_context"],
  }
});

const messageContent = MinWorkflow.addStep(ReadMessageFromLinkDefinition, {
  messageLink: MinWorkflow.inputs.message_context.message_ts,
  disableInThreads: false,
  messageContext: MinWorkflow.inputs.message_context
})

MinWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C06NUFGKHRA",
  message: messageContent.outputs.messageContent,
});

export {MinWorkflow}
