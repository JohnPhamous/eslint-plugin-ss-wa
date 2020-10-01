const rules = require('./index');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const ruleTester = new RuleTester();

const errors = [{ messageId: 'unexpected' }];
const typeCheckRule = rules['rules']['onclick-requires-data-client-id'];

ruleTester.run('type-check', typeCheckRule, {
  valid: [
    {
      code: '<button>Click Me</button>',
    },
    {
      code: '<div>Click Me</div>',
    },
    {
      code:
        '<div onClick={() => {onClickHandler()}} data-client-id="123">Click Me</div>',
    },
    {
      code: '<div onClick={onClickHandler} data-client-id="abc">Click Me</div>',
    },
    {
      code:
        '<button onClick={onClickHandler} data-client-id="abc">Click Me</button>',
    },
  ],
  invalid: [
    {
      code: '<button onClick={clickHandler}>Click Me</button>',
      errors,
    },
    {
      code: '<div onClick={clickHandler}>Click Me</div>',
      errors,
    },
    {
      code: '<div onClick={() => {clickHandler()}}>Click Me</div>',
      errors,
    },
    {
      code:
        '<div onClick={() => {clickHandler()}} data-client-id="">Click Me</div>',
      errors,
    },
    {
      code:
        // eslint-disable-next-line no-template-curly-in-string
        '<button className={`${classes.kebabButton} ${className}`} onClick={onClick} aria-label={ariaLabel}><MoreVertIcon classes={{ root: classes.kebabIcon }} /></button>',
      errors,
    },
  ],
});
