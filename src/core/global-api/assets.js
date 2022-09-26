/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // component/directive/filter
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // name选项
          definition.name = definition.name || id
          // Vue.extend({})返回一个子类，类型为VueComponent的构造函数
          // 将来实例化的时候通过new definition来得到组件实例
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册组件：options.components.comp = definition
        // 初始化的时候，选项会和用户传入的局部components配置进行合并
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
