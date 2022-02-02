import type { TServerResponse } from '$lib/types';
import * as utils from '$lib/utils';

export default async (
	server,
	{ currentPage, rowsPerPage, searchTerm, currentSortColumn, sortOrderAsc }
): Promise<TServerResponse> => {
	let serverDefaults = {
		url: '',
		queryFields: {
			page: 'page',
			itemsPerPage: 'itemsPerPage',
			search: 'search',
			sortColumn: 'sortColumn',
			sortOrderAsc: 'sortOrderAsc'
		},
		requestOptions: {
			method: 'get',
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({})
		}
	};

	if (typeof server === 'string') {
		serverDefaults.url = server;
		server = serverDefaults;
	}

	if (typeof server === 'object' && !Array.isArray(server)) {
		server = utils.mergeDeep(serverDefaults, server);
	}

	const url = utils.urlBuilder
		.setUrl(server.url)
		.addParam(server.queryFields.page, currentPage)
		.addParam(server.queryFields.itemsPerPage, rowsPerPage)
		.addParam(server.queryFields.search, searchTerm)
		.addParam(server.queryFields.sortColumn, currentSortColumn)
		.addParam(server.queryFields.sortOrderAsc, sortOrderAsc)
		.get();

	console.log(url);

	return await utils.requestData(url, server.requestOptions);
};
