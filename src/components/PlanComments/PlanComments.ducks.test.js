import { loop, Cmd } from 'redux-loop';
import { reset } from 'redux-form';
import reducer, { NAME, actions } from './PlanComments.ducks';
import { saveComment, editComment } from './model';

describe('Saving a comment', () => {
  it('should call saveComment with given comment from action.payload', () => {
    const plan = {};
    const comment = { commentId: 1 };
    const action = actions.addComment(plan, comment);
    const result = reducer({}, action);

    expect(result).toEqual(loop(
      result[0],
      Cmd.run(saveComment, {
        successActionCreator: actions.addCommentSuccess,
        failActionCreator: actions.addCommentError,
        args: [plan, comment],
      })
    ));
  });

  it('should remove error from the state', () => {
    const state = { commentAddError: new Error() };
    const action = actions.addComment();
    const [result] = reducer(state, action);
    expect(result.commentAddError).toEqual(undefined);
  });

  it('should not discard other members of the state', () => {
    const state = { a: 1 };
    const action = actions.addComment();
    const [result] = reducer(state, action);
    expect(result.a).toEqual(state.a);
  });

  it('should not mutate the state object', () => {
    const state = {};
    const action = actions.addComment();
    const [result] = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

describe('Save comment success', () => {
  it('should clear the comment form', () => {
    const state = { comments: {} };
    const comment = { commentId: 1 };
    const action = actions.addCommentSuccess(comment);
    const result = reducer(state, action);
    expect(result).toEqual(loop(
      result[0],
      Cmd.action(reset(NAME))
    ));
  });

  it('should add comment received from the server to the map of comments', () => {
    const state = { comments: {} };
    const comment = { commentId: 1 };
    const action = actions.addCommentSuccess(comment);
    const [result] = reducer(state, action);
    expect(result.comments['1']).toBe(comment);
  });

  it('should not discard previously added comments', () => {
    const state = { comments: { 2: {} } };
    const comment = { commentId: 1 };
    const action = actions.addCommentSuccess(comment);
    const [result] = reducer(state, action);
    expect(result.comments['2']).not.toBe(undefined);
  });

  it('should not discard other members of the state', () => {
    const state = { comments: {}, a: 1 };
    const comment = { commentId: 1 };
    const action = actions.addCommentSuccess(comment);
    const [result] = reducer(state, action);
    expect(result.a).toBe(state.a);
  });

  it('should not mutate the state object', () => {
    const state = { comments: {} };
    const comment = { commentId: 1 };
    const action = actions.addCommentSuccess(comment);
    const [result] = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

describe('Save comment failure', () => {
  it('should add error to the state', () => {
    const state = { comments: {} };
    const error = new Error();
    const action = actions.addCommentError(error);
    const result = reducer(state, action);
    expect(result.commentAddError).toBe(error);
  });

  it('should not discard other members of the state', () => {
    const state = { comments: {}, a: 1 };
    const action = actions.addCommentError();
    const result = reducer(state, action);
    expect(result.a).toBe(state.a);
  });

  it('should not mutate the state object', () => {
    const state = { comments: {} };
    const action = actions.addCommentError();
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

describe('Toggling comment\'s approval', () => {
  it('should update comment', () => {
    const plan = {};
    const comment = { commentId: 1 };
    const action = actions.toggleCommentApproval(plan, comment, true);
    const result = reducer({}, action);

    expect(result).toEqual(loop(
      result[0],
      Cmd.run(editComment, {
        failActionCreator: actions.toggleCommentApprovalError,
        args: [plan, comment],
      })
    ));
  });

  it('should remove error from the state', () => {
    const state = { commentEditError: new Error() };
    const action = actions.toggleCommentApproval();
    const [result] = reducer(state, action);
    expect(result.commentEditError).toEqual(undefined);
  });

  it('should change the given comment\'s approved flag to true', () => {
    const plan = {};
    const comment = { commentId: 1, approved: false };
    const state = { comments: { 1: comment } };
    const action = actions.toggleCommentApproval(plan, comment, true);
    const [result] = reducer(state, action);
    expect(result.comments['1'].approved).toEqual(true);
  });

  it('should change the given comment\'s approved flag to false', () => {
    const plan = {};
    const comment = { commentId: 1, approved: false };
    const state = { comments: { 1: comment } };
    const action = actions.toggleCommentApproval(plan, comment, false);
    const [result] = reducer(state, action);
    expect(result.comments['1'].approved).toEqual(false);
  });

  it('should not mutate the comments map', () => {
    const plan = {};
    const comment = { commentId: 1 };
    const state = { comments: {} };
    const action = actions.toggleCommentApproval(plan, comment);
    const [result] = reducer(state, action);
    expect(result.comments).not.toBe(state.comments);
  });

  it('should not discard other members of the state', () => {
    const state = { a: 1 };
    const action = actions.toggleCommentApproval();
    const [result] = reducer(state, action);
    expect(result.a).toEqual(state.a);
  });

  it('should not mutate the state object', () => {
    const state = {};
    const action = actions.toggleCommentApproval();
    const [result] = reducer(state, action);
    expect(result).not.toBe(state);
  });
});

describe('Comment approval toggle failure', () => {
  it('should add error to the state', () => {
    const state = { comments: {} };
    const error = new Error();
    const action = actions.toggleCommentApprovalError([{}, error]);
    const result = reducer(state, action);
    expect(result.commentEditError).toBe(error);
  });

  it('should revert the given comment\'s approved flag to false', () => {
    const comment = { commentId: 1, approved: true };
    const state = { comments: { 1: comment } };
    const action = actions.toggleCommentApprovalError([comment, new Error()]);
    const result = reducer(state, action);
    expect(result.comments['1'].approved).toEqual(true);
  });

  it('should revert the given comment\'s approved flag to true', () => {
    const comment = { commentId: 1, approved: false };
    const state = { comments: { 1: comment } };
    const action = actions.toggleCommentApprovalError([comment, new Error()]);
    const result = reducer(state, action);
    expect(result.comments['1'].approved).toEqual(false);
  });

  it('should not mutate the comments map', () => {
    const comment = { commentId: 1 };
    const state = { comments: {} };
    const action = actions.toggleCommentApprovalError([comment, new Error()]);
    const result = reducer(state, action);
    expect(result.comments).not.toBe(state.comments);
  });

  it('should not discard other members of the state', () => {
    const state = { a: 1, comments: {} };
    const action = actions.toggleCommentApprovalError([{}, new Error()]);
    const result = reducer(state, action);
    expect(result.a).toEqual(state.a);
  });

  it('should not mutate the state object', () => {
    const state = { comments: {} };
    const action = actions.toggleCommentApprovalError([{}, new Error()]);
    const result = reducer(state, action);
    expect(result).not.toBe(state);
  });
});
