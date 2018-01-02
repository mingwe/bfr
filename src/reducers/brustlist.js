import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';
import $ from "jquery";
import axios from 'axios';
import * as MYCONST from '../constants/ApiConst';

const initialState = {
  marks: {}
};




export default function brust(state = initialState, action) {

    function doMainRequest(url) {
        return (
            $.ajax({
                url: url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    return('ok');
                },
                error: function(xhr, status, err) {
                    return ('fail');
                }
            })
        )
    }

    function addthemark() {
        return {
            ...state,
            marks: {
                ...state.marks,
                mark: action.name
            },
        }
    }

  switch (action.type) {


    case types.ADD_MARK:
        return {
            ...state,
            marks: {
                ...state.marks,
                mark: action.name
            },
        }

    case types.ADD_MODEL:      
      return {
        ...state,
        marks: {
          ...state.marks,
          model: action.name
        },
      }

    case types.DEL_ALL:
       return {
        ...state,
          marks: ''
       }


      case types.DO_REQUEST:
          // console.log(doMainRequest(MYCONST.HOST_URL+'auto/info?api_key='+MYCONST.API_KEY+'&auto_id='+action.name));

          return {
              ...state,
              testidk: 'asd'
          };

          // return {
          //     ...state,
          //     testidk: 'promise test'
          // };



    default:
      return state;
  }
}
