import { Manifest } from "deno-slack-sdk/mod.ts";
import { ReadMessageFromLinkDefinition } from "./read_message_from_link.ts";


export default Manifest({
  name: "Read Message from Link",
  description: "A Slack function step that reads messages from links",
  icon: "icon.png",
  workflows: [],
  outgoingDomains: [],
  datastores: [],
  functions: [ReadMessageFromLinkDefinition],
  botScopes: [
    "channels:history",
    "groups:history"
  ],
});
