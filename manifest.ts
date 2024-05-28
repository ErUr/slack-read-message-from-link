import { Manifest } from "deno-slack-sdk/mod.ts";
import { ReadMessageFromLinkDefinition } from "./read_message_from_link.ts";
import { RemoveHttpPrefixDefinition } from "./remove_http_prefix.ts";
import { ExampleTicketWorkflow } from "./workflows/example_ticket/example_workflow.ts";


export default Manifest({
  name: "Slack utilities",
  description: "A bunch of Slack functions to fix some obvious gaps of the platform",
  icon: "icon.png",
  workflows: [ExampleTicketWorkflow],
  outgoingDomains: [],
  datastores: [],
  functions: [ReadMessageFromLinkDefinition, RemoveHttpPrefixDefinition],
  botScopes: [
    "channels:history",
    "groups:history",
    "chat:write",
    "chat:write.public",
    "reactions:read",
  ],
});
