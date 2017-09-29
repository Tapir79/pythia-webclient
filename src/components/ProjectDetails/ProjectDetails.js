import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import { getCurrentProject, listPlans } from '../../selectors';
import { omit } from '../../utils';
import ShowDetails from './ShowDetails';
import Message from '../common/Message';
import PlansList from '../PlansList';
import './ProjectDetails.css';

const mapStateToProps = state => ({
  error: state.projectDetails.error,
  project: getCurrentProject(state),
  plans: listPlans(state),
});

const mapDispatchToProps = () => ({
  // FIXME: replace when implemented!
  removePlan: () => undefined,
});

/**
 * Show project details with plans list etc.
 * @param {object} props
 * @param {number} props.projectId
 * @param {Error} props.error
 * @param {object} props.project
 * @param {function} props.removePlan
 */
const ProjectDetails = ({ error, removePlan, project, plans }) => (
  <div className="ProjectDetails">
    {error && (
      <div>
        <Message type="danger" message={error.message} />
        <Link href={ROUTES.HOME}>{t('link.back_to_home_page')}.</Link>
      </div>
    )}
    {!error && project && (
      <div className="ProjectDetails__content-wrapper">
        <ShowDetails
          title={project.name}
          details={omit(['name', 'projectId', 'plans'], project)}
        />

        <div className="ProjectDetails__plans-wrapper">
          <h3>{t('header.project.plans')}</h3>
          {plans.length
            ? <PlansList project={project} plans={plans} removePlan={removePlan} />
            : <div className="text-italic">{t('project.details.no_plans')}</div>}
        </div>

        <div className="row ProjectDetails__actions-wrapper">
          <div className="six columns">
            <Link className="button u-full-width" href={`/project/${project.projectId}/edit`}>
              <i className="fa fa-fw fa-pencil fa-lg" aria-hidden="true" />&nbsp;{t('button.edit_project')}
            </Link>
          </div>
          <div className="six columns">
            <Link className="button button-primary u-full-width" href={`/project/${project.projectId}/plan/new`}>
              <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
