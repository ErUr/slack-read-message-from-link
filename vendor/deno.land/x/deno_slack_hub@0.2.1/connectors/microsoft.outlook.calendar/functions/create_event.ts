/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { DefineConnector } from "../../../deps.ts";
import { Schema } from "../../../deps.ts";

export default DefineConnector({
  callback_id: "A05QGEFR3SP#/functions/create_event",
  title: "Create a calendar event",
  input_parameters: {
    properties: {
      outlook_access_token: {
        type: Schema.slack.types.oauth2,
        description: "Outlook credential to use",
        title: "Outlook access token",
      },
      event_title: { type: Schema.types.string, title: "Title" },
      start_time: { type: Schema.slack.types.timestamp, title: "Start time" },
      end_time: { type: Schema.slack.types.timestamp, title: "End time" },
      timezone: {
        type: Schema.types.string,
        description: "Select a timezone",
        title: "Timezone",
      },
      attendees: {
        type: Schema.types.array,
        description: "Search all people...",
        title: "Attendees",
        items: { type: Schema.slack.types.user_id },
      },
    },
    required: [
      "event_title",
      "start_time",
      "end_time",
      "timezone",
      "attendees",
    ],
  },
  output_parameters: {
    properties: {
      event_url: { type: Schema.types.string, title: "Event URL" },
    },
    required: [],
  },
});