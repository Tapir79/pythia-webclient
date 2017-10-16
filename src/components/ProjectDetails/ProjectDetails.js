import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import t from '../../locale';
import { getCurrentProject, getCurrentSisterProjects, listLatestVersionsOfPlans } from '../../selectors';
import { formProjectDetailFields } from './model';
import { formProjectUrl } from '../../utils/ajax';
import ShowDetails from '../ShowDetails';
import Message from '../common/Message';
import PlansList from '../PlansList';
import LoadingOverlay from '../common/LoadingOverlay';
import { ProjectList } from '../ProjectList';
import LinkButton from '../common/LinkButton';

import './ProjectDetails.css';

const mapStateToProps = state => ({
  error: state.projectDetails.error,
  project: getCurrentProject(state),
  sisterProjects: getCurrentSisterProjects(state),
  plans: listLatestVersionsOfPlans(state),
  isFetching: state.projectDetails.isFetching,
});

/**
 * Show project details with plans list etc.
 * @param {object} props
 * @param {Error} props.error
 * @param {object} props.project
 * @param {object[]} props.plans
 * @param {boolean} props.isFetching
 * @param {object[]} props.sisterProjects
 */
const ProjectDetails = ({ error, project, plans, isFetching, sisterProjects }) => (
  <div className="ProjectDetails">
    <LoadingOverlay isVisible={isFetching} />
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
          fields={formProjectDetailFields(project)}
        />

        <div>
          <h3>{t('project.sister_projects')}</h3>
          <ProjectList projects={sisterProjects} />
        </div>

        <div className="ProjectDetails__plans-wrapper">
          <h3>{t('header.project.plans')}</h3>
          <PlansList project={project} plans={plans} />
        </div>

        <div className=" ProjectDetails__actions-wrapper">
          <div className="row">
            <div className="six columns">
              <LinkButton
                className="u-full-width"
                href={`${formProjectUrl(project.projectId, 'edit')}`}
                icon="fa-pencil"
                text={t('button.edit_project')}
              />
            </div>
            <div className="six columns">
              <LinkButton
                className="button-primary u-full-width"
                href={`${formProjectUrl(project.projectId, 'plan/new')}`}
                icon="fa-plus"
                text={t('button.add_plans')}
              />
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              <LinkButton
                className="u-full-width"
                icon="fa-angle-left"
                text={t('button.back_to_project_list')}
                href={ROUTES.HOME}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default connect(mapStateToProps)(ProjectDetails);
