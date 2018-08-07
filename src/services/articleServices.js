import fetch from './utils/request'
import {getParameterValue} from '../plugins/paramsPlugin'

export const getBannerList = () => fetch.get('getArticlesOnColumn', {
  channelId: getParameterValue('channelId') || '1002',
  column: 'mbfm',
  deleteState: 0,
  pageNo: 1,
  pageSize: 10,
  orderDir: 'desc',
  orderColumn: 'showTime',
  preRrelease: 0
})
