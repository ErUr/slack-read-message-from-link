import { Manifest } from "deno-slack-sdk/mod.ts";
import { ReadMessageFromLinkDefinition } from "./read_message_from_link.ts";
import { RemoveHttpPrefixDefinition } from "./remove_http_prefix.ts";


export default Manifest({
  name: "Slack utilities",
  description: "A bunch of Slack functions to fix some obvious gaps of the platform",
  icon: "icon.png",
  workflows: [],
  outgoingDomains: [],
  datastores: [],
  functions: [ReadMessageFromLinkDefinition, RemoveHttpPrefixDefinition],
  botScopes: [
    "channels:history",
    "groups:history"
  ],
});
