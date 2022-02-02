import type { TRow } from '$lib/types';
import * as utils from '$lib/utils';

export default async (url: string): Promise<TRow[]> => {
	return await utils.requestData(url);
};
