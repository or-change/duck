class Role {
	constructor(manager, name, play) {
		this.manager = manager;
		this.name = name;
		this.play = play.bind();
	}

	async act(RunningKit) {
		const ActingKit = RunningKit(`Acting<${this.name}>`);

		ActingKit.Acting = { name: this.name };
		await this.play(ActingKit);
	}
}

class Mode {
	constructor(manager, name, execute) {
		this.manager = manager;
		this.name = name;
		this.execute = execute.bind();
	}

	async boot(RunningKit) {
		const BootingKit = RunningKit(`Booting<${this.name}>`);
		const actors = {};

		for (const [, role] of this.manager.roles) {
			actors[role.name] = async () => await role.act(RunningKit);
		}

		Object.freeze(actors);
		BootingKit.Booting = { name: this.name, actors };
		await this.execute(BootingKit);
	}
}

export class RunnerManager {
	constructor() {
		this.modes = new Map();
		this.roles = new Map();
	}

	Mode(name, execute) {
		this.modes.set(name, new Mode(this, name, execute));
	}

	Role(name, play) {
		this.roles.set(name, new Role(this, name, play));
	}

	async run(modeName, Kit) {
		if (!this.modes.has(modeName)) {
			throw new Error(`No mode(${modeName}) is found.`);
		}

		const RunningKit = Kit('Running');
		const mode = this.modes.get(modeName);

		await mode.boot(RunningKit);
	}
}
