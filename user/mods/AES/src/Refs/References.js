"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.References = void 0;
class References {
    container;
    preSptModLoader;
    configServer;
    saveServer;
    itemHelper;
    logger;
    staticRouter;
    onUpdateModService;
    database;
    databaseService;
    customItem;
    imageRouter;
    jsonUtil;
    profileHelper;
    ragfairPriceService;
    importerUtil;
    FileSystemSync;
    tables;
    botHelper;
    randomUtil;
    hashUtil;
    probHelper;
    traderHelper;
    botController;
    httpResponse;
    preSptLoad(container) {
        this.container = container;
        this.preSptModLoader =
            container.resolve("PreSptModLoader");
        this.imageRouter = container.resolve("ImageRouter");
        this.configServer = container.resolve("ConfigServer");
        this.saveServer = container.resolve("SaveServer");
        this.itemHelper = container.resolve("ItemHelper");
        this.logger = container.resolve("WinstonLogger");
        this.staticRouter = container.resolve("StaticRouterModService");
        this.onUpdateModService =
            container.resolve("OnUpdateModService");
        this.randomUtil = container.resolve("RandomUtil");
        this.database = container.resolve("DatabaseServer");
        this.databaseService =
            container.resolve("DatabaseService");
        this.tables = this.databaseService.getTables();
        this.customItem = container.resolve("CustomItemService");
        this.jsonUtil = container.resolve("JsonUtil");
        this.profileHelper = container.resolve("ProfileHelper");
        this.ragfairPriceService = container.resolve("RagfairPriceService");
        this.importerUtil = container.resolve("ImporterUtil");
        this.FileSystemSync = container.resolve("FileSystemSync");
        this.botHelper = container.resolve("BotHelper");
        this.hashUtil = container.resolve("HashUtil");
        this.probHelper = container.resolve("ProbabilityHelper");
        this.traderHelper = container.resolve("TraderHelper");
        this.botController = container.resolve("BotController");
        this.httpResponse = container.resolve("HttpResponseUtil");
    }
    postDBLoad(container) {
        this.container = container;
        this.database = container.resolve("DatabaseServer");
        this.imageRouter = container.resolve("ImageRouter");
        this.logger = container.resolve("WinstonLogger");
        this.tables = container
            .resolve("DatabaseServer")
            .getTables();
        this.customItem = container.resolve("CustomItemService");
        this.jsonUtil = container.resolve("JsonUtil");
        this.profileHelper = container.resolve("ProfileHelper");
        this.ragfairPriceService = container.resolve("RagfairPriceService");
        this.importerUtil = container.resolve("ImporterUtil");
        this.FileSystemSync = container.resolve("FileSystemSync");
        this.botHelper = container.resolve("BotHelper");
        this.randomUtil = container.resolve("RandomUtil");
        this.itemHelper = container.resolve("ItemHelper");
        this.hashUtil = container.resolve("HashUtil");
        this.probHelper = container.resolve("ProbabilityHelper");
        this.botController = container.resolve("BotController");
        this.httpResponse = container.resolve("HttpResponseUtil");
    }
}
exports.References = References;
//# sourceMappingURL=References.js.map