import lint from '@commitlint/lint'

import {rules} from './rules'

interface LintErrorConstructorParameters {
  name: string
  message: string
  level?: number
  valid?: boolean
}

class LintError {
  name: string
  message: string
  level: number
  valid: boolean

  constructor({
    name,
    message,
    level = 2,
    valid = false,
  }: LintErrorConstructorParameters) {
    this.name = name
    this.message = message
    this.level = level
    this.valid = valid
  }
}

interface TestCaseConstructorParameters {
  rule: string
  description: string
  message: string
  valid: boolean
  errors?: LintError[]
}

class TestCase {
  rule: string
  description: string
  message: string
  valid: boolean
  errors: LintError[]

  constructor({
    rule,
    description,
    message,
    valid,
    errors = [],
  }: TestCaseConstructorParameters) {
    this.rule = rule
    this.description = description
    this.message = message
    this.valid = valid
    this.errors = errors
  }

  title(): string {
    return `${this.rule} - ${this.description}`
  }

  run(): void {
    test(this.title(), async () => {
      const result = await lint(this.message, rules as any) // FIXME

      // Debugging is easier if this check is first.
      if (this.valid) {
        expect(result.errors).toEqual([])
      } else {
        expect(result.errors).toEqual(this.errors)
      }

      expect(result.valid).toBe(this.valid)
      expect(result.warnings).toEqual([])
    })
  }
}

const strings = {
  errors: {
    scopeEnum: {
      message: 'scope must be one of [contrib, deps, github, gitlab, license, lint, package, readme, release]',
      name: 'scope-enum',
    },
  },
}

const testCases: TestCase[] = [
  new TestCase({
    rule: 'body-case',
    description: 'No body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-case',
    description: 'Sentence-case is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'body-case',
    description: 'Lower-case is invalid',
    message: 'build(lint): Add awesome linting\n\nthis linting is really awesome.',
    valid: false,
    errors: [
      new LintError({
        name: 'body-case',
        message: 'body must be sentence-case',
      }),
    ],
  }),
  new TestCase({
    rule: 'body-empty',
    description: 'Empty body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-empty',
    description: 'Non-empty body is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'body-leading-blank',
    description: 'No body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-leading-blank',
    description: 'Leading blank is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'body-leading-blank',
    description: 'No leading blank is invalid',
    message: 'build(lint): Add awesome linting\nThis linting is really awesome.',
    valid: false,
    errors: [
      new LintError({
        name: 'body-leading-blank',
        message: 'body must have leading blank line',
      }),
    ],
  }),
  new TestCase({
    rule: 'body-max-length',
    description: 'No body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-max-length',
    description: 'Any length body is valid',
    message: `build(lint): Add awesome linting\n\n${'This linting is really awesome.\n'.repeat(100)}`,
    valid: true,
  }),
  new TestCase({
    rule: 'body-max-line-length',
    description: 'No body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-max-line-length',
    description: `Body with short enough lines is valid`,
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'body-max-line-length',
    description: 'Body with too long lines is invalid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome, but in all the excitement this line was made too long.',
    valid: false,
    errors: [
      new LintError({
        name: 'body-max-line-length',
        message: "body's lines must not be longer than 72 characters",
      }),
    ],
  }),
  new TestCase({
    rule: 'body-min-length',
    description: 'No body is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'body-min-length',
    description: 'Any length body is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-empty',
    description: 'No footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-empty',
    description: 'Any footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #123',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-leading-blank',
    description: 'No footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-leading-blank',
    description: 'Leading blank is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #123',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-leading-blank',
    description: 'No leading blank is invalid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\nCloses #123',
    valid: false,
    errors: [
      new LintError({
        name: 'footer-leading-blank',
        message: 'footer must have leading blank line',
      }),
    ],
  }),
  new TestCase({
    rule: 'footer-max-length',
    description: 'No footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-max-length',
    description: 'Any footer length is valid',
    message: `build(lint): Add awesome linting\n\nThis linting is really awesome.\n\n${'Closes #123\n'.repeat(100)}`,
    valid: true,
  }),
  new TestCase({
    rule: 'footer-max-line-length',
    description: 'No footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-max-line-length',
    description: 'Footer with short enough lines is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #123',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-max-line-length',
    description: 'Footer with too long lines is invalid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15, #16',
    valid: false,
    errors: [
      new LintError({
        name: 'footer-max-line-length',
        message: "footer's lines must not be longer than 72 characters",
      }),
    ],
  }),
  new TestCase({
    rule: 'footer-min-length',
    description: 'No footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.',
    valid: true,
  }),
  new TestCase({
    rule: 'footer-min-length',
    description: 'Any length footer is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #123',
    valid: true,
  }),
  new TestCase({
    rule: 'header-case',
    description: 'Header with same style as type-case is valid (lower-case)',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'header-full-stop',
    description: 'Header without full stop is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'header-full-stop',
    description: 'Header with full stop is invalid',
    message: 'build(lint): Add awesome linting.',
    valid: false,
    errors: [
      new LintError({
        name: 'header-full-stop',
        message: 'header may not end with full stop',
      }),
      new LintError({
        name: 'subject-full-stop',
        message: 'subject may not end with full stop',
      }),
    ],
  }),
  new TestCase({
    rule: 'header-max-length',
    description: 'Header with short enough line is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'header-max-length',
    description: 'Header with too long line is invalid',
    message: 'build(lint): Add really awesome linting with too much detail in the header so it is too long',
    valid: false,
    errors: [
      new LintError({
        name: 'header-max-length',
        message: 'header must not be longer than 72 characters, current length is 92',
      }),
      new LintError({
        name: 'subject-max-length',
        message: 'subject must not be longer than 50 characters',
      }),
    ],
  }),
  new TestCase({
    rule: 'references-empty',
    description: 'No references is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'references-empty',
    description: 'References present is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nCloses #123',
    valid: true,
  }),
  new TestCase({
    rule: 'scope-case',
    description: 'Lower-case scope is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'scope-case',
    description: 'Upper-case scope is invalid',
    message: 'build(LINT): Add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'scope-case',
        message: 'scope must be lower-case',
      }),
      new LintError({
        name: strings.errors.scopeEnum.name,
        message: strings.errors.scopeEnum.message,
      }),
    ],
  }),
  new TestCase({
    rule: 'scope-empty',
    description: 'Non-empty scope is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'scope-empty',
    description: 'Empty scope is invalid',
    message: 'build: Add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'scope-empty',
        message: 'scope may not be empty',
      }),
    ],
  }),
  new TestCase({
    rule: 'scope-enum',
    description: 'Scope in whitelist is valid',
    message: 'docs(readme): Add readme',
    valid: true,
  }),
  new TestCase({
    rule: 'scope-enum',
    description: 'Scope not in whitelist is invalid',
    message: 'build(foobarbaz): This scope is not valid',
    valid: false,
    errors: [
      new LintError({
        name: strings.errors.scopeEnum.name,
        message: strings.errors.scopeEnum.message,
      }),
    ],
  }),
  new TestCase({
    rule: 'scope-max-length',
    description: 'Scope of any length is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'scope-min-length',
    description: 'Scope of any length is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'signed-off-by',
    description: 'No Signed-off-by is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'signed-off-by',
    description: 'Signed-off-by present is valid',
    message: 'build(lint): Add awesome linting\n\nThis linting is really awesome.\n\nSigned-off-by: Awesome Developer <awesome.developer@example.com>',
    valid: true,
  }),
  new TestCase({
    rule: 'subject-case',
    description: 'Sentence-case is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'subject-case',
    description: 'Lower-case is invalid',
    message: 'build(lint): add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'subject-case',
        message: 'subject must be sentence-case',
      }),
    ],
  }),
  new TestCase({
    rule: 'subject-empty',
    description: 'Non-empty subject is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'subject-empty',
    description: 'Empty subject is invalid',
    message: 'build(lint): ',
    valid: false,
    errors: [
      new LintError({
        name: 'subject-empty',
        message: 'subject may not be empty',
      }),
    ],
  }),
  new TestCase({
    rule: 'subject-full-stop',
    description: 'Subject without full stop is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'subject-full-stop',
    description: 'Subject with full stop is invalid',
    message: 'build(lint): Add awesome linting.',
    valid: false,
    errors: [
      new LintError({
        name: 'header-full-stop',
        message: 'header may not end with full stop',
      }),
      new LintError({
        name: 'subject-full-stop',
        message: 'subject may not end with full stop',
      }),
    ],
  }),
  new TestCase({
    rule: 'subject-max-length',
    description: 'Subject that is short enough is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'subject-max-length',
    description: 'Subject that is too long is invalid',
    message: 'build(lint): Add awesome linting with a subject that is too long',
    valid: false,
    errors: [
      new LintError({
        name: 'subject-max-length',
        message: 'subject must not be longer than 50 characters',
      }),
    ],
  }),
  new TestCase({
    rule: 'subject-min-length',
    description: 'Subject of non-zero length is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'type-case',
    description: 'Lower-case is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'type-case',
    description: 'Upper-case is invalid',
    message: 'Build(lint): Add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'type-case',
        message: 'type must be lower-case',
      }),
      new LintError({
        name: 'type-enum',
        message: 'type must be one of [build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test]',
      }),
    ],
  }),
  new TestCase({
    rule: 'type-empty',
    description: 'Type not empty is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'type-empty',
    description: 'Type empty is invalid',
    message: '(lint): Add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'type-empty',
        message: 'type may not be empty',
      }),
    ],
  }),
  new TestCase({
    rule: 'type-enum',
    description: 'Type in whitelist is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'type-enum',
    description: 'Type not in whitelist is invalid',
    message: 'foobarbaz(lint): Add awesome linting',
    valid: false,
    errors: [
      new LintError({
        name: 'type-enum',
        message: 'type must be one of [build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test]',
      }),
    ],
  }),
  new TestCase({
    rule: 'type-max-length',
    description: 'Type of any length is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
  new TestCase({
    rule: 'type-min-length',
    description: 'Type of any length is valid',
    message: 'build(lint): Add awesome linting',
    valid: true,
  }),
]

for (const testCase of testCases) {
  testCase.run()
}
