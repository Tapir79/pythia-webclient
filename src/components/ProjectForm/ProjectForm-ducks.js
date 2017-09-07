import { createAction, handleActions } from 'redux-actions';
import { loop, Cmd } from 'redux-loop';
import { push } from 'redux-little-router';
import { saveProject } from './model';

export const NAME = 'projectForm';

const CREATE_PROJECT = 'pythia-webclient/ProjectForm/CREATE_PROJECT';
const CREATE_PROJECT_SUCCESS = 'pythia-webclient/ProjectForm/CREATE_PROJECT_SUCCESS';
const CREATE_PROJECT_FAIL = 'pythia-webclient/ProjectForm/CREATE_PROJECT_FAIL';
const CLEAR_SEND_ERROR = 'pythia-webclient/ProjectForm/CLEAR_SEND_ERROR';

export const actions = {
  /**
   * Send a newly created project to the server
   */
  createProject: createAction(
    CREATE_PROJECT,
    formValues => formValues
  ),
  /**
   * Action triggered if the createProject action succeeds
   */
  saveProjectSuccessAction: createAction(
    CREATE_PROJECT_SUCCESS,
    project => project
  ),
  /**
   * Action triggered if the createAction project fails
   */
  saveProjectFailAction: createAction(
    CREATE_PROJECT_FAIL,
    err => err
  ),
  /**
   * Action triggered when form send error is closed
   */
  clearSendError: createAction(
    CLEAR_SEND_ERROR
  ),
};

// ProjectForm reducer
export default handleActions({
  // handle createProject action
  [CREATE_PROJECT]: (state, action) => loop(
    { ...state, error: null },
    Cmd.run(saveProject, {
      successActionCreator: actions.saveProjectSuccessAction,
      failActionCreator: actions.saveProjectFailAction,
      args: [action.payload],
    })
  ),
  // handle createProject success action
  [CREATE_PROJECT_SUCCESS]: (state, action) => loop(
    state,
    Cmd.action(push(`/project/${action.payload.id}`))
  ),
  // handle createProject fail action
  [CREATE_PROJECT_FAIL]: (state, action) => ({ ...state, error: action.payload }),
  // handle clear send error action
  [CLEAR_SEND_ERROR]: state => ({ ...state, error: null }),
}, {});
