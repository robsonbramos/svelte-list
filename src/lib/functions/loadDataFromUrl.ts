import * as utils from '$lib/utils';

export default async (url: string): Promise<void> => {
	return await utils.requestData(url);
};
