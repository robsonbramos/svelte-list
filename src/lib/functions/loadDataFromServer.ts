import type { TServerResponse } from '$lib/types';
import * as utils from '$lib/utils';

export default async (
	server: string,
	{ currentPage, rowsPerPage, searchTerm, currentSortColumn, sortOrderAsc }
): Promise<TServerResponse> => {
	const url = utils.urlBuilder
		.setUrl(server)
		.addParam('page', currentPage)
		.addParam('itemsPerPage', rowsPerPage)
		.addParam('search', searchTerm)
		.addParam('sortColumn', currentSortColumn)
		.addParam('sortOrderAsc', sortOrderAsc)
		.get();

	return await utils.requestData(url);
};
