module.exports = {
  rules: {
    'onclick-requires-data-client-id': {
      meta: {
        docs: {
          description:
            'Elements that have an onClick must also have a data-client-id.',
        },
        messages: {
          unexpected:
            'Elements that have an onClick must also have a data-client-id.',
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
                  attribute.name.name === 'onClick'
              );
              const hasDataClientId = node.attributes.some(
                (attribute) =>
                  attribute &&
                  attribute.name &&
                  attribute.name.name === 'data-client-id' &&
                  attribute.value.value !== ''
              );

              if (hasOnClick && !hasDataClientId) {
                context.report({ node, messageId: 'unexpected' });
              }
            }
          },
        };
      },
    },
  },
};
