import t from '../../locale';
import { postJSON, ServerResponseError } from '../../utils/ajax';
import { withTimeout } from '../../utils';

export const SAVE_PLAN_URL = '/pythia/v1/plans/';

/**
 * Send plan to the server.
 * @async
 * @param {object} plan Values from the plan form
 * @return {Promise}
 */
export const savePlan = plan =>
  withTimeout(2 * 60 * 1000, postJSON(SAVE_PLAN_URL, plan)
    .catch((error) => {
      throw new ServerResponseError(t('network.error.plan.create'), error.status);
    }));
