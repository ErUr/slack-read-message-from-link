import { Manifest } from "deno-slack-sdk/mod.ts";
import { ReadMessageFromLinkDefinition } from "./read_message_from_link.ts";
import { ExampleTicketWorkflow } from "./workflows/example_ticket/example_ticket_workflow.ts";
import { MinWorkflow } from "./workflows/example_ticket/min_wf.ts";


export default Manifest({
  name: "Read Message from Link",
  description: "A Slack function step that reads messages from links",
  icon: "icon.png",
  outgoingDomains: [],
  datastores: [],
  functions: [ReadMessageFromLinkDefinition],
  workflows: [
    ExampleTicketWorkflow,
    MinWorkflow
  ],
  botScopes: [
    "channels:history",
    "groups:history",
    "chat:write",
    "chat:write.public",
    "reactions:read",
  ],
});
