import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';

/**
 * Cancel button / link for a form
 * @param {object} props
 * @param {string} props.href Link href
 */
const FormCancelButton = ({ href }) => (
  <Link className="button u-full-width" href={href}>
    <i className="fa fa-times fa-lg" aria-hidden="true" />&nbsp;
    {t('button.cancel')}
  </Link>
);

export default FormCancelButton;