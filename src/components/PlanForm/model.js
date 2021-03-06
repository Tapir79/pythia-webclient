import * as R from 'ramda';
import t from '../../locale';
import { formPlanIdentifier } from '../../utils';
import { formPlanApiUrl, uploadFile } from '../../utils/ajax';

/**
 * Upload a file to the server
 * @private
 * @async
 * @param {object} plan
 * @param {File} file
 * @param {boolean} isVersioning
 * @return {string} File url received as a response
 */
const savePlan = (projectId, file, isVersioning) => uploadFile(
  `${formPlanApiUrl({ projectId })}${isVersioning ? '?version=true' : ''}`,
  file
);

/**
 * Loop all files and save them as individual plans. Try to resolve
 * their subNo from the file name
 * @private
 * @async
 * @param {object} planValues Values related to plan
 * @param {boolean} isVersioning If true the new version endpoint is called
 * @param {File} file File to be uploaded
 * @return {object[]} All the saved plans
 */
const saveFiles = ({ projectId, files }, isVersioning) => new Promise((resolve, reject) => {
  const succeeded = [];
  const rejected = [];

  /**
   * Resolve the promise when all file upload/plan save promises are resolved or rejected
   * and at least one of the promises succeeded. If all requests failed then reject the promise
   */
  const resolveWhenAllDone = () => {
    if (rejected.length === files.length) {
      reject(new Error(t('network.error.plan.create')));
    } else if (succeeded.length + rejected.length === files.length) {
      resolve([succeeded, rejected]);
    }
  };

  // loop all files and save a plan object for each one and upload file to s3
  // put each resolve or reject value to a corresponding basket and resolve
  // promise when all requests are done
  files.forEach((file) => {
    savePlan(projectId, file, isVersioning)
      .then((result) => {
        succeeded.push(R.omit(['files'], result));
        resolveWhenAllDone(resolve);
      })
      .catch(() => {
        rejected.push(file.name);
        resolveWhenAllDone(resolve);
      });
  });
});

/**
 * Save plan(s) to the server
 * @async
 * @param {object} values
 * @param {boolean} isVersioning
 * @return {object|object[]} Plan(s) received from the server as response(s)
 */
export const savePlans = async (values, isVersioning) => {
  if (!values.projectId) {
    throw new Error('InvalidArgumentsException: ProjectId is missing or invalid!');
  }

  if (!(values.files || []).length) {
    throw new Error('Cannot save plans without files');
  }

  return saveFiles(values, isVersioning);
};

export const uniqByPlanProps = R.uniqBy(formPlanIdentifier);
