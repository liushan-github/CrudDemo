import {Effect} from 'dva';
import {Reducer} from 'redux';

import {query, add, remove, update} from '@/services/tableTest';

interface TableModelState {
  data?: Array<object>;
  loading?: boolean

}

interface TableModelType {
  namespace: 'table';
  state: TableModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<TableModelState>;
  };
}

const TableModel: TableModelType = {
  namespace: 'table',
  state: {
    data: [],
  },

  effects: {
    * fetch(payload, {call, put}) {
      const response = yield call(query, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    * add({payload, callback}, {call, put}) {
      const response = yield call(add, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(remove, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(update, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload || [],
      };
    },


  },
};

export default TableModel;
