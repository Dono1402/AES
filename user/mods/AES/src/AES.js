"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const References_1 = require("./Refs/References");
const Utils_1 = require("./Refs/Utils");
const anastasiaAssort = __importStar(require("../db/Anastasia/anastasiaAssort.json"));
const anastasiaBase = __importStar(require("../db/Anastasia/anastasiaBase.json"));
const evelynAssort = __importStar(require("../db/Evelyn/evelynAssort.json"));
const evelynBase = __importStar(require("../db/Evelyn/evelynBase.json"));
const svetlanaAssort = __importStar(require("../db/Svetlana/svetlanaAssort.json"));
const svetlanaBase = __importStar(require("../db/Svetlana/svetlanaBase.json"));
const AnastasiaQuestAssort = __importStar(require("../db/Anastasia/AnastasiaQuestAssort.json"));
const EvelynQuestAssort = __importStar(require("../db/Evelyn/EvelynQuestAssort.json"));
const SvetlanaQuestAssort = __importStar(require("../db/Svetlana/SvetlanaQuestAssort.json"));
const modName = "AES";
class AESTraders {
    ref = new References_1.References();
    preSptLoad(container) {
        this.ref.preSptLoad(container);
        this.ref.logger.debug(`[${modName}] preSpt Loading...`);
        const ragfair = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const traderConfig = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const traderUtils = new Utils_1.TraderUtils(this.ref);
        traderUtils.registerProfileImage(anastasiaBase, modName, "Anastasia");
        traderUtils.registerProfileImage(evelynBase, modName, "Evelyn");
        traderUtils.registerProfileImage(svetlanaBase, modName, "Svetlana");
        traderUtils.setTraderUpdateTime(traderConfig, anastasiaBase, 3000, 9000);
        traderUtils.setTraderUpdateTime(traderConfig, evelynBase, 3000, 9000);
        traderUtils.setTraderUpdateTime(traderConfig, svetlanaBase, 3000, 9000);
        Traders_1.Traders[anastasiaBase._id] = anastasiaBase._id;
        Traders_1.Traders[evelynBase._id] = evelynBase._id;
        Traders_1.Traders[svetlanaBase._id] = svetlanaBase._id;
        ragfair.traders[anastasiaBase._id] = true;
        ragfair.traders[evelynBase._id] = true;
        ragfair.traders[svetlanaBase._id] = true;
        this.ref.logger.debug(`[${modName}] preSpt Loaded`);
    }
    postDBLoad(container) {
        this.ref.postDBLoad(container);
        this.ref.logger.debug(`[${modName}] postDb Loading...`);
        this.ref.tables.traders[anastasiaBase._id] = AnastasiaQuestAssort;
        this.ref.tables.traders[evelynBase._id] = EvelynQuestAssort;
        this.ref.tables.traders[svetlanaBase._id] = SvetlanaQuestAssort;
        const traderUtils = new Utils_1.TraderUtils(this.ref);
        traderUtils.addAnastasiaToDb(anastasiaBase, anastasiaAssort);
        traderUtils.addEvelynToDb(evelynBase, evelynAssort);
        traderUtils.addSvetlanaToDb(svetlanaBase, svetlanaAssort);
        traderUtils.addTraderToLocales(anastasiaBase, anastasiaBase.name, "Anastasia", anastasiaBase.nickname, anastasiaBase.location, "A Russian girl that provides the best weapons accessories in Tarkov. She don't care if you're BEAR or USEC.");
        traderUtils.addTraderToLocales(evelynBase, evelynBase.name, "Evelyn", evelynBase.nickname, evelynBase.location, "A trained American soldier who leads a small USEC group and seeks to join the High Command at the Military Base.");
        traderUtils.addTraderToLocales(svetlanaBase, svetlanaBase.name, "Svetlana", svetlanaBase.nickname, svetlanaBase.location, "A trained Bear that supervises the entrances and exits of one of the hundreds of Bear centers in Tarkov.");
        this.ref.logger.debug(`[${modName}] postDb Loaded`);
    }
}
module.exports = { mod: new AESTraders() };
//# sourceMappingURL=AES.js.map