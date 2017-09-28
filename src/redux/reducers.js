import { reducer as formReducer } from 'redux-form';
import * as ProjectForm from '../components/ProjectForm';
import * as PlanForm from '../components/PlanForm';
import * as Notifications from '../components/Notifications';
import * as ProjectDetails from '../components/ProjectDetails';
import * as HomePage from '../components/HomePage';
import projectReducer, * as Project from './project.ducks';
import plansReducer, * as Plans from './plans.ducks';

/**
 * All redux reducers as an object. Reducer name as key and reducer function as value
 * @type {object}
 */
export default {
  form: formReducer,
  [ProjectForm.NAME]: ProjectForm.reducer,
  [PlanForm.NAME]: PlanForm.reducer,
  [Notifications.NAME]: Notifications.reducer,
  [ProjectDetails.NAME]: ProjectDetails.reducer,
  [HomePage.NAME]: HomePage.reducer,
  [Project.NAME]: projectReducer,
  [Plans.NAME]: plansReducer,
};
