
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
// import { Connectors } from "deno-slack-hub/mod.ts";
import { ReadMessageFromLinkDefinition } from "../../read_message_from_link.ts";
// import { CallClaudeAPIDefinition } from "../../../slack-call-claude-api/call_claude_api.ts"

const ExampleTicketWorkflow = DefineWorkflow({
  callback_id: "example_workflow",
  title: "Create Asana Task",
  description: "Create an Asana Task from a Slack message",
  input_parameters: {
    properties: {
      reacting_user_id: {
        type: Schema.slack.types.user_id,
      },
      message_context: {
        type: Schema.slack.types.message_context,
      },
      message_link: {
        type: Schema.types.string
      },
      parent_link: {
        type: Schema.types.string
      }
    },
    required: ["reacting_user_id", "message_context", "message_link", "parent_link"],
  },
});

ExampleTicketWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C06NUFGKHRA",
  message: "TEST",
});


// const messageContent = ExampleTicketWorkflow.addStep(ReadMessageFromLinkDefinition, {
//   messageLink: ExampleTicketWorkflow.inputs.parent_link,
//   disableInThreads: false,
// })

// ExampleTicketWorkflow.addStep(Schema.slack.functions.SendMessage, {
//   channel_id: "C06NUFGKHRA",
//   message: messageContent.outputs.messageContent,
// });


// // //todo: get user identity via new custom step (really starting to dislike the platform at this point)
// const claudeSummary = ExampleTicketWorkflow.addStep(CallClaudeAPIDefinition, {
//   model: "claude-3-haiku-20240307",
//   system: `Your job is to create Asana task names from messages in a Slack channel. Your output will be used as the title of an Asana task. 
//   Keep your titles short and fitting for a ticket title.
//   Don't include any markdown or links if possible. Links are ok to include if there is no better way to preserve meaning.`,
//   message: `Please create an Asana task name from the following message from ${ExampleTicketWorkflow.inputs.reacting_user_id}: 
//   <message>
//   ${messageContent.outputs.messageContent}
//    </message>`,
//    temperature: 1,
//    max_tokens: 1024
// })

// ExampleTicketWorkflow.addStep(Schema.slack.functions.SendMessage, {
//   channel_id: "C06NUFGKHRA",
//   message: claudeSummary.outputs.output,
// });


// const createAsanaTaskResult = ExampleTicketWorkflow.addStep(Connectors.Asana.functions.CreateTask, {
//   asana_access_token: {
//     credential_source: "END_USER"
//   },
//   workspace_gid: "1204286242980496",
//   project: "1206801285346727",
//   assignee: ExampleTicketWorkflow.inputs.reacting_user_id,
//   name: claudeSummary.outputs.output,
//   description: `
//   ${messageContent.outputs.messageContent}
//   --- ${ExampleTicketWorkflow.inputs.reacting_user_id}

//   Original Slack message: ${ExampleTicketWorkflow.inputs.message_link}
// `,
//   tags: ["Slack"],
//   collaborators: [ExampleTicketWorkflow.inputs.message_context.user_id].join(",")

// })

// ExampleTicketWorkflow.addStep(Schema.slack.functions.ReplyInThread, {
//   message_context: ExampleTicketWorkflow.inputs.message_context,
//   message: `:asana: <${createAsanaTaskResult.outputs.permalink_url}|${claudeSummary.outputs.output}>`,
// });

export { ExampleTicketWorkflow };
