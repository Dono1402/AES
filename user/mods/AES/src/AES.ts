import type { DependencyContainer } from "tsyringe";

import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { Traders } from "@spt/models/enums/Traders";
import type { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import type { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import type { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { References } from "./Refs/References";
import { TraderUtils } from "./Refs/Utils";

import * as anastasiaAssort from "../db/Anastasia/anastasiaAssort.json";
import * as anastasiaBase from "../db/Anastasia/anastasiaBase.json";
import * as evelynAssort from "../db/Evelyn/evelynAssort.json";
import * as evelynBase from "../db/Evelyn/evelynBase.json";
import * as svetlanaAssort from "../db/Svetlana/svetlanaAssort.json";
import * as svetlanaBase from "../db/Svetlana/svetlanaBase.json";
import * as AnastasiaQuestAssort from "../db/Anastasia/AnastasiaQuestAssort.json";
import * as EvelynQuestAssort from "../db/Evelyn/EvelynQuestAssort.json";
import * as SvetlanaQuestAssort from "../db/Svetlana/SvetlanaQuestAssort.json";
const modName = "AES";

class AESTraders implements IPreSptLoadMod, IPostDBLoadMod {
	private ref: References = new References();

	public preSptLoad(container: DependencyContainer): void {
		this.ref.preSptLoad(container);
		this.ref.logger.debug(`[${modName}] preSpt Loading...`);

		const ragfair: IRagfairConfig =
			this.ref.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
		const traderConfig: ITraderConfig =
			this.ref.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
		const traderUtils = new TraderUtils(this.ref);
		traderUtils.registerProfileImage(anastasiaBase, modName, "Anastasia");
		traderUtils.registerProfileImage(evelynBase, modName, "Evelyn");
		traderUtils.registerProfileImage(svetlanaBase, modName, "Svetlana");
		traderUtils.setTraderUpdateTime(traderConfig, anastasiaBase, 3000, 9000);
		traderUtils.setTraderUpdateTime(traderConfig, evelynBase, 3000, 9000);
		traderUtils.setTraderUpdateTime(traderConfig, svetlanaBase, 3000, 9000);
		Traders[anastasiaBase._id] = anastasiaBase._id;
		Traders[evelynBase._id] = evelynBase._id;
		Traders[svetlanaBase._id] = svetlanaBase._id;
		ragfair.traders[anastasiaBase._id] = true;
		ragfair.traders[evelynBase._id] = true;
		ragfair.traders[svetlanaBase._id] = true;

		this.ref.logger.debug(`[${modName}] preSpt Loaded`);
	}

	public postDBLoad(container: DependencyContainer): void {
		this.ref.postDBLoad(container);
		this.ref.logger.debug(`[${modName}] postDb Loading...`);
		this.ref.tables.traders[anastasiaBase._id] = AnastasiaQuestAssort;
		this.ref.tables.traders[evelynBase._id] = EvelynQuestAssort;
		this.ref.tables.traders[svetlanaBase._id] = SvetlanaQuestAssort;
		const traderUtils = new TraderUtils(this.ref);
		traderUtils.addAnastasiaToDb(anastasiaBase, anastasiaAssort);
		traderUtils.addEvelynToDb(evelynBase, evelynAssort);
		traderUtils.addSvetlanaToDb(svetlanaBase, svetlanaAssort);
		traderUtils.addTraderToLocales(
			anastasiaBase,
			anastasiaBase.name,
			"Anastasia",
			anastasiaBase.nickname,
			anastasiaBase.location,
			"A Russian girl that provides the best weapons accessories in Tarkov. She don't care if you're BEAR or USEC.",
		);
		traderUtils.addTraderToLocales(
			evelynBase,
			evelynBase.name,
			"Evelyn",
			evelynBase.nickname,
			evelynBase.location,
			"A trained American soldier who leads a small USEC group and seeks to join the High Command at the Military Base.",
		);
		traderUtils.addTraderToLocales(
			svetlanaBase,
			svetlanaBase.name,
			"Svetlana",
			svetlanaBase.nickname,
			svetlanaBase.location,
			"A trained Bear that supervises the entrances and exits of one of the hundreds of Bear centers in Tarkov.",
		);

		this.ref.logger.debug(`[${modName}] postDb Loaded`);
	}
}
module.exports = { mod: new AESTraders() };