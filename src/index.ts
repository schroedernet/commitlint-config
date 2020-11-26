import {UserConfig} from '@commitlint/types'

import {extend} from './extend'
import {rules} from './rules'

const config: UserConfig = {
  extends: extend,
  rules,
}

export default config
