import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { formProjectUrl } from '../../utils/ajax';
import './ProjectList.css';

/**
 * A list component for displaying projects
 * @param {object} props
 * @param {object[]} props.projects
 */
const ProjectList = ({ projects = [] }) => (
  <section className="ProjectList">
    {projects.length ? (
      <div className="ProjectList__header">
        <div className="two columns">{t('common.id')}</div>
        <div className="ten columns">{t('project.name')}</div>
      </div>
    ) : null}
    <ul className="ProjectList clear-list-styles">
      {projects.map(({ projectId, hansuProjectId, name }) => (
        <li className="ProjectListItem" key={projectId}>
          <Link href={formProjectUrl(projectId)}>
            <div className="two columns ProjectList__hansuId">{hansuProjectId}</div>
            <div className="nine columns">{name}</div>
            <div className="one column"><i className="fa fa-eye" /></div>
          </Link>
        </li>
      ))}
      {!projects.length && <li className="text-italic">{t('projectlist.no_projects')}</li>}
    </ul>
  </section>
);

export default ProjectList;
