/**
 * WordPress dependencies
 */
import {
	registerBlockType,
	setDefaultBlockName,
	setUnregisteredTypeHandlerName,
	setGroupingBlockName,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as paragraph from './paragraph';
import * as image from './image';
import * as heading from './heading';
import * as quote from './quote';
import * as gallery from './gallery';
import * as archives from './archives';
import * as audio from './audio';
import * as button from './button';
import * as calendar from './calendar';
import * as categories from './categories';
import * as code from './code';
import * as columns from './columns';
import * as column from './column';
import * as cover from './cover';
import * as embed from './embed';
import * as file from './file';
import * as html from './html';
import * as mediaText from './media-text';
import * as latestComments from './latest-comments';
import * as latestPosts from './latest-posts';
import * as list from './list';
import * as missing from './missing';
import * as more from './more';
import * as nextpage from './nextpage';
import * as preformatted from './preformatted';
import * as pullquote from './pullquote';
import * as reusableBlock from './block';
import * as rss from './rss';
import * as search from './search';
import * as separator from './separator';
import * as shortcode from './shortcode';
import * as spacer from './spacer';
import * as subhead from './subhead';
import * as table from './table';
import * as textColumns from './text-columns';
import * as verse from './verse';
import * as video from './video';
import * as tagCloud from './tag-cloud';
import * as group from './group';

export const coreBlocks = [
	// Common blocks are grouped at the top to prioritize their display
	// in various contexts — like the inserter and auto-complete components.
	paragraph,
	image,
	heading,
	gallery,
	list,
	quote,

	// Register all remaining core blocks.
	shortcode,
	archives,
	audio,
	button,
	calendar,
	categories,
	code,
	columns,
	column,
	cover,
	embed,
	...embed.common,
	...embed.others,
	file,
	html,
	mediaText,
	latestComments,
	latestPosts,
	missing,
	more,
	nextpage,
	preformatted,
	pullquote,
	rss,
	search,
	separator,
	reusableBlock,
	spacer,
	subhead,
	table,
	tagCloud,
	textColumns,
	verse,
	video,
].reduce( ( accumulator, block ) => {
	accumulator[ block.name ] = block;
	return accumulator;
}, {} );

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { metadata, settings, name } = block;
	registerBlockType( name, {
		...metadata,
		...settings,
	} );
};

// only enable code block for development
// eslint-disable-next-line no-undef
const devOnly = ( block ) => ( !! __DEV__ ? block : null );

/**
 * Function to register core blocks provided by the block editor.
 *
 * @example
 * ```js
 * import { registerCoreBlocks } from '@wordpress/block-library';
 *
 * registerCoreBlocks();
 * ```
 */
export const registerCoreBlocks = () => {
	[
		paragraph,
		heading,
		devOnly( code ),
		missing,
		more,
		image,
		video,
		nextpage,
		separator,
		list,
		quote,
		mediaText,
		preformatted,
		gallery,
		group,
		button,
		spacer,
		shortcode,
	].forEach( registerBlock );

	setDefaultBlockName( paragraph.name );
	setUnregisteredTypeHandlerName( missing.name );
	if ( group ) {
		setGroupingBlockName( group.name );
	}
};
