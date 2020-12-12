module.exports = {
  rules: {
    "onclick-requires-data-client-id": {
      meta: {
        docs: {
          description:
            "Elements that have an onClick must also have a data-client-id, data-client-type, or clientId.",
        },
        messages: {
          missingId:
            "Elements that have an onClick must also have a data-client-id, data-client-type, or clientId.",
          missingDatadog:
            "Interactable elements need a data-dd-action-name to prevent logging private user data.",
        },
      },
      create: function (context) {
        return {
          JSXOpeningElement: function (node) {
            if (node.attributes.length > 0) {
              const hasOnClick = node.attributes.some(
                (attribute) =>
                  attribute &&
                  attribute.name &&
                  attribute.name.name === "onClick"
              );
              const hasDataClientId = node.attributes.some(
                (attribute) =>
                  attribute &&
                  attribute.name &&
                  (attribute.name.name === "data-client-id" ||
                    attribute.name.name === "data-client-type" ||
                    attribute.name.name === "clientId") &&
                  attribute.value.value !== ""
              );
              const hasDataDogActionName = node.attributes.some(
                (attribute) =>
                  attribute &&
                  attribute.name &&
                  attribute.name.name === "data-dd-action-name"
              );

              if (hasDataClientId && !hasDataDogActionName) {
                context.report({ node, messageId: "missingDatadog" });
              }

              if (hasOnClick && !hasDataClientId) {
                context.report({ node, messageId: "missingId" });
              }
            }
          },
        };
      },
    },
  },
};
