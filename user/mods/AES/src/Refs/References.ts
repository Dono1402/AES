import type { DependencyContainer } from "tsyringe";

import type { BotController } from "@spt/controllers/BotController";
import type { BotHelper } from "@spt/helpers/BotHelper";
import type { ItemHelper } from "@spt/helpers/ItemHelper";
import type { ProbabilityHelper } from "@spt/helpers/ProbabilityHelper";
import type { ProfileHelper } from "@spt/helpers/ProfileHelper";
import type { TraderHelper } from "@spt/helpers/TraderHelper";
import type { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import type { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import type { ImageRouter } from "@spt/routers/ImageRouter";
import type { ConfigServer } from "@spt/servers/ConfigServer";
import type { DatabaseServer } from "@spt/servers/DatabaseServer";
import type { SaveServer } from "@spt/servers/SaveServer";
import type { DatabaseService } from "@spt/services/DatabaseService";
import type { RagfairPriceService } from "@spt/services/RagfairPriceService";
import type { CustomItemService } from "@spt/services/mod/CustomItemService";
import type { OnUpdateModService } from "@spt/services/mod/onUpdate/OnUpdateModService";
import type { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import type { HashUtil } from "@spt/utils/HashUtil";
import type { HttpResponseUtil } from "@spt/utils/HttpResponseUtil";
import type { ImporterUtil } from "@spt/utils/ImporterUtil";
import type { JsonUtil } from "@spt/utils/JsonUtil";
import type { RandomUtil } from "@spt/utils/RandomUtil";
import type { FileSystemSync } from "@spt/utils/FileSystemSync";

export class References {
	public container: DependencyContainer;
	public preSptModLoader: PreSptModLoader;
	public configServer: ConfigServer;
	public saveServer: SaveServer;
	public itemHelper: ItemHelper;
	public logger: ILogger;
	public staticRouter: StaticRouterModService;
	public onUpdateModService: OnUpdateModService;

	public database: DatabaseServer;
	public databaseService: DatabaseService;
	public customItem: CustomItemService;
	public imageRouter: ImageRouter;
	public jsonUtil: JsonUtil;
	public profileHelper: ProfileHelper;
	public ragfairPriceService: RagfairPriceService;
	public importerUtil: ImporterUtil;
	public FileSystemSync: FileSystemSync;
	public tables: IDatabaseTables;
	public botHelper: BotHelper;
	public randomUtil: RandomUtil;
	public hashUtil: HashUtil;
	public probHelper: ProbabilityHelper;
	public traderHelper: TraderHelper;
	public botController: BotController;
	public httpResponse: HttpResponseUtil;

	public preSptLoad(container: DependencyContainer): void {
		this.container = container;
		this.preSptModLoader =
			container.resolve<PreSptModLoader>("PreSptModLoader");
		this.imageRouter = container.resolve<ImageRouter>("ImageRouter");
		this.configServer = container.resolve<ConfigServer>("ConfigServer");
		this.saveServer = container.resolve<SaveServer>("SaveServer");
		this.itemHelper = container.resolve<ItemHelper>("ItemHelper");
		this.logger = container.resolve<ILogger>("WinstonLogger");
		this.staticRouter = container.resolve<StaticRouterModService>(
			"StaticRouterModService",
		);
		this.onUpdateModService =
			container.resolve<OnUpdateModService>("OnUpdateModService");
		this.randomUtil = container.resolve<RandomUtil>("RandomUtil");
		this.database = container.resolve<DatabaseServer>("DatabaseServer");
		this.databaseService =
			container.resolve<DatabaseService>("DatabaseService");
		this.tables = this.databaseService.getTables();
		this.customItem = container.resolve<CustomItemService>("CustomItemService");
		this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
		this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
		this.ragfairPriceService = container.resolve<RagfairPriceService>(
			"RagfairPriceService",
		);
		this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
		this.FileSystemSync = container.resolve<FileSystemSync>("FileSystemSync");
		this.botHelper = container.resolve<BotHelper>("BotHelper");
		this.hashUtil = container.resolve<HashUtil>("HashUtil");
		this.probHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
		this.traderHelper = container.resolve<TraderHelper>("TraderHelper");
		this.botController = container.resolve<BotController>("BotController");
		this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
	}

	public postDBLoad(container: DependencyContainer): void {
		this.container = container;
		this.database = container.resolve<DatabaseServer>("DatabaseServer");
		this.imageRouter = container.resolve<ImageRouter>("ImageRouter");
		this.logger = container.resolve<ILogger>("WinstonLogger");
		this.tables = container
			.resolve<DatabaseServer>("DatabaseServer")
			.getTables();
		this.customItem = container.resolve<CustomItemService>("CustomItemService");
		this.jsonUtil = container.resolve<JsonUtil>("JsonUtil");
		this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
		this.ragfairPriceService = container.resolve<RagfairPriceService>(
			"RagfairPriceService",
		);
		this.importerUtil = container.resolve<ImporterUtil>("ImporterUtil");
		this.FileSystemSync = container.resolve<FileSystemSync>("FileSystemSync");
		this.botHelper = container.resolve<BotHelper>("BotHelper");
		this.randomUtil = container.resolve<RandomUtil>("RandomUtil");
		this.itemHelper = container.resolve<ItemHelper>("ItemHelper");
		this.hashUtil = container.resolve<HashUtil>("HashUtil");
		this.probHelper = container.resolve<ProbabilityHelper>("ProbabilityHelper");
		this.botController = container.resolve<BotController>("BotController");
		this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
	}
}
