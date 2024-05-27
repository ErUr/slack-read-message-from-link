
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { Connectors } from "deno-slack-hub/mod.ts";
import { ReadMessageFromLinkDefinition } from "../../read_message_from_link.ts";

const ExampleTicketWorkflow = DefineWorkflow({
  callback_id: "example_ticket_workflow",
  title: "Create Asana ticket for Example team",
  description: "Create a ticket from a Slack message by reacting with :example-ticket: to it.",
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
  },
});

const messageContent = ExampleTicketWorkflow.addStep(ReadMessageFromLinkDefinition, {
  messageLink: ExampleTicketWorkflow.inputs.message_context.message_ts,
  disableInThreads: false
})


const createAsanaTaskResult = ExampleTicketWorkflow.addStep(Connectors.Asana.functions.CreateTask, {
  asana_access_token: {
    credential_source: "END_USER"
  },
  workspace_gid: "1204286242980496",
  project: "1206801285346727",
  assignee: ExampleTicketWorkflow.inputs.reacting_user_id,
  name: messageContent.outputs.messageContentRaw,
  description: messageContent.outputs.messageContent,
  tags: ["Slack"],
  collaborators: [ExampleTicketWorkflow.inputs.message_context.user_id].join(",")

})

ExampleTicketWorkflow.addStep(Schema.slack.functions.ReplyInThread, {
  message_context: ExampleTicketWorkflow.inputs.message_context,
  message: createAsanaTaskResult.outputs.permalink_url,
});

export { ExampleTicketWorkflow };
