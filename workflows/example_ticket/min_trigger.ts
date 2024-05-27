import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";

import { MinWorkflow } from "./min_wf.ts";

const createNewMinShortcut: Trigger<
  typeof MinWorkflow.definition
> = {
  type: TriggerTypes.Event,
  name: "MIN Reactji trigger",
  description: "responds to a specific reactji",
  workflow: `#/workflows/${MinWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.ReactionAdded,
    all_resources: true,
    filter: {
      version: 1,
      root: {
        statement: "{{data.reaction}} == example-ticket"
      }
    }
  },
  inputs: {
    reacting_user_id: {
      value: TriggerContextData.Event.ReactionAdded.user_id,
    },
    message_context: {
      value: TriggerContextData.Event.ReactionAdded.message_context,
    },
    parent_link: {
      value: TriggerContextData.Event.ReactionAdded.parent_message_link,
    },
  },
};

export default createNewMinShortcut;