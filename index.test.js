const rules = require("./index");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const ruleTester = new RuleTester();

const missingIdError = [{ messageId: "missingId" }];
const typeCheckRule = rules["rules"]["onclick-requires-data-client-id"];

ruleTester.run("type-check", typeCheckRule, {
  valid: [
    {
      code: "<button>Click Me</button>",
    },
    {
      code: "<div>Click Me</div>",
    },
    {
      code:
        '<div onClick={() => {onClickHandler()}} data-client-id="123" data-dd-action-name="123">Click Me</div>',
    },
    {
      code:
        '<div onClick={onClickHandler} data-client-id="abc" data-dd-action-name="abc">Click Me</div>',
    },
    {
      code:
        '<button onClick={onClickHandler} data-client-id="abc"  data-dd-action-name="abc">Click Me</button>',
    },
    {
      code: `<Checkbox checkedState={false} onClick={onCheckboxClickHandler} clientId={'id'}  data-dd-action-name="id"/>`,
    },
    {
      code: `<Checkbox checkedState={false} onClick={onCheckboxClickHandler} data-client-id={'id'}  data-dd-action-name="id"/>`,
    },
    {
      code: `<Checkbox checkedState={false} onClick={onCheckboxClickHandler} data-client-type={'type'}  data-dd-action-name="type"/>`,
    },
    {
      code: `<Checkbox checkedState={false} data-client-type={'type'}  data-dd-action-name="type"/>`,
    },
    {
      code: `<Checkbox checkedState={false} data-client-id={'type'}  data-dd-action-name="type"/>`,
    },
    {
      code: `<Checkbox checkedState={false} clientId={'type'} data-dd-action-name="type"/>`,
    },
  ],
  invalid: [
    {
      code: "<button onClick={clickHandler}>Click Me</button>",
      errors: missingIdError,
    },
    {
      code: "<div onClick={clickHandler}>Click Me</div>",
      errors: missingIdError,
    },
    {
      code: "<div onClick={() => {clickHandler()}}>Click Me</div>",
      errors: missingIdError,
    },
    {
      code:
        '<div onClick={() => {clickHandler()}} data-client-id="">Click Me</div>',
      errors: missingIdError,
    },
    {
      code:
        // eslint-disable-next-line no-template-curly-in-string
        "<button className={`${classes.kebabButton} ${className}`} onClick={onClick} aria-label={ariaLabel}><MoreVertIcon classes={{ root: classes.kebabIcon }} /></button>",
      errors: missingIdError,
    },
  ],
});
