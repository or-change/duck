import * as Duck from '@produck/duck';
import { Schema } from '@produck/mold';
import Workspace from '@produck/workspace';

interface WorkspaceOptions {
	root?: string;
	[key: string]: string;
}

export function Component(options: WorkspaceOptions): Duck.Component;

declare module '@produck/duck' {
	interface ProductKit {
		Workspace: Workspace;
	}
}

export namespace Options {
	export const Schema: Schema<WorkspaceOptions>;

	export function normalize(options: WorkspaceOptions): WorkspaceOptions;
}
