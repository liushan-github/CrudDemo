import request from '@/utils/request';

interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}

export async function query(params: TableListParams) {
  return request('/table/test', {
    params,
  });
}

export async function remove(params: TableListParams) {
  return request('/table/test', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function add(params: TableListParams) {
  return request('/table/test', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function update(params: TableListParams) {
  return request('/table/test', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
