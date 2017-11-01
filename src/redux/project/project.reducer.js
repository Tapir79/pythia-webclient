import { combineActions, handleActions } from 'redux-actions';
import { actionTypes as ProjectForm } from '../../components/ProjectForm';
import { actionTypes as ProjectDetails } from '../../components/ProjectDetails';
import * as actionTypes from './project.actiontypes';


/**
 * Export reducer's name. Will be registerd to
 * the application state with this name
 */
export const NAME = 'project';

// ProjectForm reducer
export default handleActions({
  // handle saveProject edit/save success action
  [combineActions(
    ProjectForm.PROJECT_SUCCESS,
    ProjectDetails.FETCH_PROJECT_SUCCESS,
    actionTypes.PROJECT_UPDATE_SUCCESS,
  )]: (state, action) => ({ ...action.payload, plans: [] }),
}, {});
