/* @flow */

import * as nodeOps /* dom操作函数 */ from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.

// vdom的klass, attrs等的属性更新函数
const modules = platformModules.concat(baseModules)

// 把真实dom操作函数和vdom属性更新函数传给createPatchFunction
export const patch: Function = createPatchFunction({ nodeOps, modules })
