import t from '../locale';
import { append } from './normalizers';

/**
 * Field definitions for the plan form. Object key is field name and
 * id value is an object containing all field definitions
 * @namespace fields
 * @property {string} type Field input type
 * @property {string} label Field label text
 * @property {string} placeholder Field placeholder text
 * @property {function} format Field value formatter @see https://redux-form.com/7.0.4/docs/api/field.md/
 * @property {function} normalize Field value normalizer @see https://redux-form.com/7.0.4/docs/api/field.md/
 * @property {object} validation Field validation rules with rule name as key
 *                               and rule value as value. For example:
 *                               "type": "number" validation will return an error if
 *                               the value given cannot be converted to a number
 */
const fields = {
  files: {
    type: 'file',
    multiple: true,
    label: t('plan.files'),
    placeholder: t('dropzone.placeholder'),
    normalize: append,
  },
};

export default fields;
