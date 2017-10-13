import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { createFieldsWithValidations } from '../../forms/form-utils';
import formFields from '../../forms/plan';
import { getCurrentProject } from '../../selectors';
import { NAME, actions } from './PlanForm.ducks';

import CreateEditAndSaveForm from '../CreateEditAndSaveForm';

// form field configuration objects with validator functions from field definitions
const fieldsWithValidations = createFieldsWithValidations(formFields);

/**
 * Redux-form configuration object
 */
const formConfig = {
  /**
   * Form identifier used in form reducer
   * @type {string}
   */
  form: NAME,
  /**
   * Tell redux-form to remove all form related data from
   * the state once the form component is unmounted
   * @type {boolean}
   */
  destroyOnUnmount: true,
  /**
   * Tell redux-form to reinitialize itself when initialValues change
   * @type {boolean}
   */
  enableReinitialize: true,
  /**
   * Tell redux-form to keep it's dirty values when reinitializing
   * @type {boolean}
   */
  keepDirtyOnReinitialize: true,
};

/**
 * Gather all the props needed from the application state
 * @param {object} state
 * @return {object}
 */
const mapStateToProps = (state, ownProps) => {
  const { projectId, mainNo } = getCurrentProject(state) || {};
  const { plan } = ownProps;
  const fields = fieldsWithValidations.map(f =>
    ({ ...f, disabled: Boolean(plan && plan.approved) })
  );
  const actionProps = plan
    ? { initialValues: { ...plan, projectId, files: plan.url ? [plan.url] : [] } }
    : { initialValues: { mainNo, projectId } };

  return {
    fields,
    formSendError: state.planForm.error,
    cancelHref: `/project/${projectId}`,
    ...actionProps,
  };
};

/**
 * Gather all the action creators needed
 * @param {function} dispatch the dispatcher function
 * @param {object} ownProps actual props passed to the component
 * @return {object}
 */
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  clearSendError: actions.clearSendError,
  submitAction: ownProps.plan
    ? actions.editPlan
    : actions.savePlan,
}, dispatch);

/**
 * Form component for creating and saving a plan entity
 * Use common form component
 */
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm(formConfig)
)(CreateEditAndSaveForm);
