export default (posts = [], action) => {
	switch (action.type) {
		case 'FETCH_BY_SEARCH':
			return action.payload;
			// return { ...state, posts: action.payload.data };
		case 'DELETE':
      return posts.filter((post) => post._id !== action.payload);
		case 'UPDATE':
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		case 'LIKE':
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...posts, action.payload];
		default:
			return posts;
	}
};
