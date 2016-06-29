// export default function({ dispatch }) {
// 	return function(next) {
// 		return function(action) {
// 			console.log(action);

// 			next(action);
// 		}
// 	}
// }

export default ({ dispatch }) => {
	return next => action => {
		// If action does not have payload
		// or, the payload does not have a .then property
		// we dont care about it, send it on
		if (!action.payload || !action.payload.then) {
			// to go to the next action or else the chain stops here
			return next(action);
		}

		// Make sure the action's promise resolves
		action.payload
			.then(function(response) {
				// creates a new action with the old type, but
				// replace the promise with the response data
				const newAction = {
					// make sure we use old type: xxx
					...action,
					// replace the payload promise with actual data
					payload: response
				};
				// dispatch new instead of continuing because we dont want
				// to keep track of middlewares run order, therefore
				// run from beginning again, top down
				dispatch(newAction);
			});
	};
}

// idea is to check if it has a promise
// 	No? next middleware
// 	Yes? sit and wait to resolve
// 		Resolved? Create new action with data as payload and send it through all the middlewares again
// 		Eg. action = {
// 			type: xxx,
// 			payload: response-data
// 		}
