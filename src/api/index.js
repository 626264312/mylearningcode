import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '',
        method: 'get',
        params: query
    });
};
export const logType = () => {
    return request({
      url: '',
      method: 'get'
    })
};