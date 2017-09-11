import React from 'react';
import { Link } from 'redux-little-router';
import { connect } from 'react-redux';
import t from '../../locale';
import ShowDetails from './ShowDetails';
import { getCurrentProjectId } from '../../selectors';

const mapStateToProps = state => ({
  projectId: getCurrentProjectId(state),
  project: state.projects[0],
});

/**
 * Show project details
 */
const ProjectDetails = ({ projectId, project }) => (
  <div className="container">
    <ShowDetails project={project} />
    <Link className="button" href={`/project/${projectId}/plan/new`}>
      <i className="fa fa-fw fa-file-o fa-lg" aria-hidden="true" />&nbsp;{t('button.add_plan')}
    </Link>
  </div>
);

export default connect(mapStateToProps)(ProjectDetails);
