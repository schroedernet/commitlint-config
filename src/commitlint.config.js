// <https://commitlint.js.org/#/reference-configuration>


'use strict'


// # Configuration
//
// The file is expected to contain valid javascript, export a configuration
// object, and adhere to the schema.
//
// <https://commitlint.js.org/#/reference-configuration?id=configuration>
module.exports = {
  // ## Extends
  //
  // Specify configurations to extend
  //
  // <https://commitlint.js.org/#/reference-configuration?id=shareable-configuration>
  extends: [
    '@commitlint/config-conventional',
  ],

  // ## Rules
  //
  // Rules are made up by a name and a configuration array.  The configuration
  // array contains:
  //
  // - Level `[0..2]`: `0` disables the rule. For `1` it will be considered a
  //   warning for `2` an error.
  // - Applicable `always|never`: `never` inverts the rule.
  // - Value: value to use for this rule.
  //
  // <https://commitlint.js.org/#/reference-rules?id=rules>
  rules: {
    // ### body-leading-blank
    //
    // - condition: `body` begins with blank line
    //
    // <https://commitlint.js.org/#/reference-rules?id=body-leading-blank>
    'body-leading-blank': [2, 'always', null],


    // ### body-max-length
    //
    // - condition: `body` has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=body-max-length>
    'body-max-length': [2, 'always', Infinity],


    // ### body-max-line-length
    //
    // - condition: `body` lines has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=body-max-line-length>
    'body-max-line-length': [2, 'always', 72],


    // ### body-min-length
    //
    // - condition: `body` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=body-min-length>
    'body-min-length': [2, 'always', 0],


    // ### footer-leading-blank
    //
    // - condition: `footer` begins with blank line
    //
    // <https://commitlint.js.org/#/reference-rules?id=footer-leading-blank>
    'footer-leading-blank': [2, 'always', null],


    // ### footer-max-length
    //
    // - condition: `footer` has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=footer-max-length>
    'footer-max-length': [2, 'always', Infinity],


    // ### footer-max-line-length
    //
    // - condition: `footer` lines has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=footer-max-line-length>
    'footer-max-line-length': [2, 'always', 72],


    // ### footer-min-length
    //
    // - condition: `footer` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=footer-min-length>
    'footer-min-length': [2, 'always', 0],


    // ### header-case
    //
    // - condition: `header` is in case `value`
    //
    // #### NOTE
    //
    // This rule is disabled because it dupes `type-case` (in configurations
    // like this one where `type` is expected to be the first thing in
    // `header`.)
    //
    // <https://commitlint.js.org/#/reference-rules?id=header-case>
    'header-case': [0, 'always', 'lower-case'],


    // ### header-full-stop
    //
    // - condition: `header` ends with `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=header-full-stop>
    'header-full-stop': [2, 'never', '.'],


    // ### header-max-length
    //
    // - condition: `header` has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=header-max-length>
    'header-max-length': [2, 'always', 72],


    // ### header-min-length
    //
    // - condition: `header` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=header-min-length>
    'header-min-length': [2, 'always', 0],


    // ### references-empty
    //
    // - condition: `references` has at least one entry
    //
    // <https://commitlint.js.org/#/reference-rules?id=references-empty>
    'references-empty': [0, 'never', null],


    // ### scope-enum
    //
    // - condition: `scope` is found in value
    //
    // <https://commitlint.js.org/#/reference-rules?id=scope-enum>
    'scope-enum': [2, 'always', [
      'config',
      'contrib',
      'deps',
      'license',
      'lint',
      'package',
      'readme',
    ]],


    // ### scope-case
    //
    // - condition: `scope` is in case `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=scope-case>
    'scope-case': [2, 'always', 'lower-case'],


    // ### scope-empty
    //
    // - condition: `scope` is empty
    //
    // <https://commitlint.js.org/#/reference-rules?id=scope-empty>
    'scope-empty': [2, 'never', null],


    // ### scope-max-length
    //
    // - condition: `scope` has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=scope-max-length>
    'scope-max-length': [2, 'always', Infinity],


    // ### scope-min-length
    //
    // - condition: `scope` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=scope-min-length>
    'scope-min-length': [2, 'always', 0],


    // ### signed-off-by
    //
    // - condition: `message` has `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=signed-off-by>
    'signed-off-by': [0, 'always', 'Signed-off-by:'],


    // ### subject-case
    //
    // - condition: `subject` is in case `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=subject-case>
    'subject-case': [2, 'always', 'sentence-case'],


    // ### subject-empty
    //
    // - condition: `subject` is empty
    //
    // <https://commitlint.js.org/#/reference-rules?id=subject-empty>
    'subject-empty': [2, 'never', null],


    // ### subject-full-stop
    //
    // - condition: `subject` ends with `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=subject-full-stop>
    'subject-full-stop': [2, 'never', '.'],


    // ### subject-max-length
    //
    // - condition: `subject` has value or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=subject-max-length>
    'subject-max-length': [2, 'always', 50],


    // ### subject-min-length
    //
    // - condition: `subject` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=subject-min-length>
    'subject-min-length': [2, 'always', 0],


    // ### type-case
    //
    // - description: `type` is in case `value`
    //
    // <https://commitlint.js.org/#/reference-rules?id=type-case>
    'type-case': [2, 'always', 'lower-case'],


    // ### type-empty
    //
    // - condition: `type` is empty
    //
    // <https://commitlint.js.org/#/reference-rules?id=type-empty>
    'type-empty': [2, 'never', null],


    // ### type-enum
    //
    // - condition: `type` is found in value
    //
    // <https://commitlint.js.org/#/reference-rules?id=type-enum>
    'type-enum': [2, 'always', [
      'build',
      'ci',
      'chore',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
    ]],


    // ### type-max-length
    //
    // - condition: `type` has `value` or less characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=type-max-length>
    'type-max-length': [2, 'always', Infinity],


    // ### type-min-length
    //
    // - condition: `type` has `value` or more characters
    //
    // <https://commitlint.js.org/#/reference-rules?id=type-min-length>
    'type-min-length': [2, 'always', 0],
  }
}
