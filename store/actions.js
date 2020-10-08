export default {
  async nuxtServerInit({ dispatch, commit, state }, { req }) {
    await dispatch('asyncInitData')
  },
  async asyncInitData({ commit, state }, excludes = []) {
    const result = await this.$axios.$post('system/initDataWithCache', {
      includes: {
        setting: {
          url: 'setting/findAll',
          data: {
            where: {
              is_front: true
            },
            attributes: {
              exclude: [
                'name',
                'created_at',
                'updated_at',
                'is_cache',
                'is_front',
                'is_control'
              ]
            }
          },
          include: (app => {
            return [
              {
                model: app.model.setting,
                as: 'parent',
                attributes: {
                  exclude: [
                    'name',
                    'type',
                    'value',
                    'created_at',
                    'updated_at',
                    'is_cache',
                    'is_front',
                    'is_control'
                  ]
                }
              }
            ]
          }).toString()
        },
        infoList: {
          url: 'info/findAll',
          limit: 12,
          order: [['publish_time', 'DESC']],
          data: {
            where: {
              is_show: true,
              order: -1
            },
            attributes: [
              'cover_image',
              'title',
              'is_show',
              'order',
              'weixinid',
              'publish_time'
            ]
          }
        },
        keywordList: {
          url: 'keyword/findAll',
          limit: 24,
          order: [['weight_number', 'DESC']]
        },
        ownerList: {
          url: 'owner/findAll',
          data: {
            where: {
              name: {
                $ne: ''
              }
            },
            attributes: ['id', 'name', 'image']
          }
        }
      },
      excludes
    })

    // const setting = result.setting
    //   .filter(item => item.parent_id !== 0)
    //   .map(item => {
    //     return {
    //       ...item,
    //       parent: item.parent && {
    //         code: item.parent.code,
    //         value: item.parent.value
    //       }
    //     }
    //   })
    commit('setData', {
      ...result
      // setting
    })
  }
}
