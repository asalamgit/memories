import React, { useState, useEffect } from 'react';

import { getPosts } from '../../actions/posts';

import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();
	const classes = useStyles();
	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);



	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const searchPost = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
		} else {
			history.push('/');
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
							<ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" />
							<Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper className={classes.pagination} elevation={6}>
							<Pagination page={page}/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
