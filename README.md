# Slack utilities
This is a collection of various little helper functions for Slack's Workflow Platform.

## Read Message from Link
Reads message content from a link and makes it available to subsequent steps.

## Remove HTTP Prefix
Remove `https://` or `http://` prefixes from links. Slack doesn't let you use free text when creating links with inserted values but forces you to add some `http://` prefix or auto-adds it for you. Having this link-stripper allows you to create links with custom text.