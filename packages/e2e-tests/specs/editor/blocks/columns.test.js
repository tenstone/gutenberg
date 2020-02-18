/**
 * WordPress dependencies
 */
import {
	createNewPost,
	getAllBlockInserterItemTitles,
	insertBlock,
	openAllBlockInserterCategories,
	openGlobalBlockInserter,
} from '@wordpress/e2e-test-utils';

describe( 'Columns', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'restricts all blocks inside the columns block', async () => {
		await insertBlock( 'Columns' );
		const variationButton = await page.$x(
			'//button//span[text()="Two columns; equal split"]'
		);
		await variationButton.click();
		await page.click( '[aria-label="Block navigation"]' );
		const columnBlockMenuItem = (
			await page.$x(
				'//button[contains(concat(" ", @class, " "), " block-editor-block-navigation__item-button ")][text()="Column"]'
			)
		 )[ 0 ];
		await columnBlockMenuItem.click();
		await openGlobalBlockInserter();
		await openAllBlockInserterCategories();
		expect( await getAllBlockInserterItemTitles() ).toHaveLength( 0 );
	} );
} );
